import * as S from "./styled";
import { SvgIcon, LogoSvg } from "~components";
import FadeLoader from "react-spinners/FadeLoader";

export const Preloader = () => {
  const override = {
    position: "absolute",
    left: "50%",
    top: "50%",
  };
  return (
    <S.Container>
      <S.ImageWrapper>
        <SvgIcon color={"white"} width={"100%"} style={{ opacity: 0.05 }}>
          <LogoSvg />
        </SvgIcon>
      </S.ImageWrapper>

      <FadeLoader
        color={"#FFE600"}
        width={2}
        height={12}
        margin={10}
        loading={true}
        // @ts-ignore
        css={override}
      />
    </S.Container>
  );
};
