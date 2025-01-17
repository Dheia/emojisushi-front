import * as S from "./styled";
import { BurgerSvg, UserSvg } from "~components/svg";
import {
  SvgButton,
  AuthModal,
  LanguageSelector,
  MobMenuModal,
  CartModal,
  SvgIcon,
  CartButton,
  TinyCartButton,
} from "~components";
import { Await, useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useOptimisticCartTotals } from "~hooks";
import { CartProduct } from "~models";
import { ICity, IGetCartRes, IUser } from "~api/types";

type RightProps = {
  loading?: boolean;
  cities?: ICity[];
  cart?: IGetCartRes;
  user?: IUser;
};

export const Right = ({
  loading = false,
  cities = [],
  cart,
  user,
}: RightProps) => {
  const { lang, spotSlug, citySlug } = useParams();

  const navigate = useNavigate();
  const items = loading ? [] : cart.data.map((json) => new CartProduct(json));
  const { price, quantity } = useOptimisticCartTotals({ items });

  return (
    <S.Right>
      <S.LanguageSelectorContainer>
        <LanguageSelector loading={loading} />
      </S.LanguageSelectorContainer>

      <CartModal>
        <S.CartBtn>
          <CartButton loading={loading} count={quantity} total={price} />
        </S.CartBtn>
      </CartModal>

      <CartModal>
        <S.TinyCartBtn>
          <TinyCartButton loading={loading} price={price} />
        </S.TinyCartBtn>
      </CartModal>

      <S.BurgerBtn>
        {loading ? (
          <Skeleton width={32} height={32} />
        ) : (
          <MobMenuModal cities={cities}>
            <SvgIcon width={"32px"} color={"white"}>
              <BurgerSvg />
            </SvgIcon>
          </MobMenuModal>
        )}
      </S.BurgerBtn>

      {user ? (
        loading ? (
          <Skeleton width={40} height={40} />
        ) : (
          <S.UserBtn
            onClick={() => {
              navigate(
                "/" + [lang, citySlug, spotSlug, "account", "profile"].join("/")
              );
            }}
          >
            <SvgButton>
              <SvgIcon clickable={true} width={"25px"} color={"black"}>
                <UserSvg />
              </SvgIcon>
            </SvgButton>
          </S.UserBtn>
        )
      ) : (
        <S.UserBtn>
          {loading ? (
            <Skeleton width={40} height={40} borderRadius={10} />
          ) : (
            <AuthModal>
              <SvgButton>
                <SvgIcon clickable={true} width={"25px"} color={"black"}>
                  <UserSvg />
                </SvgIcon>
              </SvgButton>
            </AuthModal>
          )}
        </S.UserBtn>
      )}
    </S.Right>
  );
};
