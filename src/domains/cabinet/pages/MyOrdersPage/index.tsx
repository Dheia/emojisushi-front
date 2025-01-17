import { useTranslation } from "react-i18next";
import { If, AccordionItem } from "~components";
import { useLoaderData } from "react-router-dom";
import { User } from "~models";
import { requireUser } from "~utils/loader.utils";

export const MyOrdersPage = () => {
  const { t } = useTranslation();
  const { user: userJson } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const user = new User(userJson);
  const customer = user.customer;
  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <If condition={customer.hasOrders}>
        {customer.orders.map((order, index) => (
          <div
            style={{
              marginTop: index ? "16px" : 0,
            }}
          >
            <AccordionItem key={order.id} order={order} />
          </div>
        ))}
      </If>
      <If condition={!customer.hasOrders}>
        <p>{t("account.orders.noOrders")}</p>
      </If>
    </div>
  );
};

export const Component = MyOrdersPage;
Object.assign(Component, {
  displayName: "LazyMyOrdersPage",
});

export const loader = async () => {
  const user = await requireUser();

  return {
    user,
  };
};
