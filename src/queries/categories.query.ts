import { IGetCategoriesParams } from "~api/types";
import { QueryOptions } from "react-query";
import { menuApi } from "~api";

export const categoriesQuery = (
  params?: IGetCategoriesParams
): QueryOptions => ({
  queryKey: ["categories", "list", params ?? "all"],
  queryFn: () => menuApi.getCategories(params).then((res) => res.data),
});
