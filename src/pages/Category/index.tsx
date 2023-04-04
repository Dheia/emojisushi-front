import { ProductsGrid } from "~components/ProductsGrid";
import { observer } from "mobx-react";
import {
  Await,
  defer,
  useAsyncValue,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";
import { useLang, useSpot, useSpotSlug } from "~hooks";
import { FlexBox } from "~components/FlexBox";
import { Banner } from "./Banner";
import { useIsDesktop } from "~common/hooks/useBreakpoint";
import { Sidebar } from "~pages/Category/Sidebar";
import { categoryLoaderIndex } from "~routes";
import { Suspense } from "react";
import { FetchQueryOptions, QueryClient } from "react-query";
import MenuApi, { IGetProductsResponse } from "~api/menu.api";
import { ICategory, IGetProductsParams } from "~api/menu.api.types";
import { queryClient } from "~query-client";
import { Product } from "~models/Product";
import WishlistApi from "~api/wishlist.api";

import { IGetCategoriesResponse } from "~api/menu.api";

export const Category = observer(() => {
  const isDesktop = useIsDesktop();

  const { categoriesQuery } = useRouteLoaderData("categoryIndex") as ReturnType<
    typeof categoryLoaderIndex
  >["data"];

  // if (!selectedCategory && categories.length > 0) {
  //   return <Navigate to={categories[0].slug} />;
  // }

  return (
    <>
      {false && <Banner />}
      <FlexBox flexDirection={isDesktop ? "row" : "column"}>
        <Suspense
          fallback={
            <>
              <Sidebar showSkeleton />
              <ProductsGrid showSkeleton />
            </>
          }
        >
          <Await resolve={categoriesQuery}>
            <AwaitedCategory />
          </Await>
        </Suspense>
      </FlexBox>
    </>
  );
});

export const AwaitedCategory = () => {
  const spotSlug = useSpotSlug();
  const categoriesQuery = useAsyncValue() as IGetCategoriesResponse;

  const publishedCategories = categoriesQuery.data
    .filter((category) => category.published)
    .filter((category) => {
      return !category.hide_categories_in_spot
        .map((spot) => spot.slug)
        .includes(spotSlug);
    });

  const { productsQuery } = useLoaderData() as ReturnType<
    typeof loader
  >["data"];

  return (
    <>
      <Sidebar categories={publishedCategories} />
      <Await resolve={productsQuery}>
        <AwaitedProducts categories={publishedCategories} />
      </Await>
    </>
  );
};

export const AwaitedProducts = ({
  categories,
}: {
  categories: ICategory[];
}) => {
  const { categorySlug, spotSlug, citySlug } = useParams();
  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit") || PRODUCTS_LIMIT_STEP;
  const navigation = useNavigation();

  const lang = useLang();

  const navigate = useNavigate();

  const selectedCategory = categories.find((category) => {
    return category.slug === categorySlug;
  });
  const title = selectedCategory?.name;

  const handleLoadMore = () => {
    const nextLimit = +limit + PRODUCTS_LIMIT_STEP;
    navigate(
      "/" +
        [lang, citySlug, spotSlug, "category", categorySlug].join("/") +
        "?limit=" +
        nextLimit
    );
  };
  const productsQuery = useAsyncValue() as IGetProductsResponse;
  const items = productsQuery.data
    .map((product) => new Product(product))
    .filter((product: Product) => {
      return !product.isHiddenInSpot(spotSlug);
    });
  const total = productsQuery.total;
  return (
    <ProductsGrid
      handleLoadMore={handleLoadMore}
      title={title}
      loadable={total > items.length}
      loading={navigation.state === "loading"}
      items={items}
    />
  );
};

export const Component = Category;

Object.assign(Component, {
  displayName: "LazyCategoryPage",
});

export const PRODUCTS_LIMIT_STEP = 25;

const productsQuery = (params: IGetProductsParams): FetchQueryOptions => ({
  queryKey: ["products", "list", params ?? "all"],
  queryFn: () => MenuApi.getProducts(params).then((res) => res.data),
});

const wishlistsQuery = (): FetchQueryOptions => ({
  queryKey: ["wishlists", "list", "all"],
  queryFn: () => {
    return WishlistApi.getList().then((res) => res.data);
  },
});

export const querifiedLoader = (queryClient: QueryClient) => {
  return ({ params, request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit") || PRODUCTS_LIMIT_STEP;
    const productQuery = productsQuery({
      category_slug: params.categorySlug || "menu",
      search: null,
      sort: null,
      offset: 0,
      limit: +limit,
    });

    const wishlistQuery = wishlistsQuery();
    return defer({
      productsQuery:
        queryClient.getQueryData(productQuery.queryKey) ??
        queryClient.fetchQuery(productQuery),
      wishlistQuery:
        queryClient.getQueryData(wishlistQuery.queryKey) ??
        queryClient.fetchQuery(wishlistQuery),
    });
  };
};

export const loader = querifiedLoader(queryClient);
