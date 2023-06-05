import { Spot } from "../Spot";
import * as S from "./styled";
import Skeleton from "react-loading-skeleton";
import { ReactNode } from "react";
import { ICity } from "~api/types";

export const City = ({
  children,
  city,
}: {
  children: ReactNode;
  city?: ICity;
}) => {
  return (
    <S.City>
      <span>{city?.name ?? <Skeleton width={170} />}</span>
      {children}
    </S.City>
  );
};

export const Spots = ({ children }: { children: ReactNode }) => {
  return <S.Spots>{children}</S.Spots>;
};

export const Cities = ({ items }: { items: ICity[] }) => {
  return (
    <S.Cities>
      {items.map((city, index) => (
        <City key={index} city={city}>
          <Spots>
            {city.spots.map((spot, index) => (
              <Spot key={index} spot={spot} />
            ))}
          </Spots>
        </City>
      ))}
    </S.Cities>
  );
};

export const CitiesSkeleton = () => {
  return (
    <S.Cities>
      <City>
        <Spots>
          <Spot />
          <Spot />
        </Spots>
      </City>
      <City>
        <Spots>
          <Spot />
        </Spots>
      </City>
    </S.Cities>
  );
};
