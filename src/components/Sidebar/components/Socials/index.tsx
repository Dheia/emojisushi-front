import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import * as S from "./styled";
import { SvgButton } from "~components/SvgButton";
import { SvgIcon } from "~components/SvgIcon";
import { InstagramSvg, TelegramSvg } from "~components/svg";
import { TelegramModal } from "~components/modals";
type SocialsProps = {
  loading?: boolean;
};

export const Socials = ({ loading = false }: SocialsProps) => {
  const { t } = useTranslation();
  return (
    <>
      <S.Text>
        {loading ? <Skeleton /> : t("underVerticalMenu.in_touch")}
      </S.Text>
      <S.SvgContainer>
        <S.OneSvg
          href={"https://www.instagram.com/emoji_sushi_/"}
          target={"_blank"}
        >
          {loading ? (
            <Skeleton width={40} height={40} />
          ) : (
            <SvgButton>
              <SvgIcon color={"black"}>
                <InstagramSvg />
              </SvgIcon>
            </SvgButton>
          )}
        </S.OneSvg>
        {loading ? (
          <Skeleton width={40} height={40} />
        ) : (
          <TelegramModal>
            <SvgButton>
              <SvgIcon color={"black"}>
                <TelegramSvg />
              </SvgIcon>
            </SvgButton>
          </TelegramModal>
        )}
      </S.SvgContainer>
    </>
  );
};
