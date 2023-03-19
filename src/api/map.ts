import axios, { AxiosResponse } from "axios";
import { searchByKeyword } from "../lib/KakaoMap";
import { IKakaoMapSearchResult } from "../types/types";
import { createQuery } from "../utils/common";

interface ISearchByKeyword {
  keyword: string;
  size?: number;
  longitude?: number;
  latitude?: number;
  radius?: number;
}

interface IKakaoMapSearchResultResponse {
  documents: IKakaoMapSearchResult[];
}

export const getLocationByKeyword = ({ keyword, size, longitude, latitude, radius }: ISearchByKeyword): Promise<AxiosResponse<IKakaoMapSearchResultResponse>> => {
  const query = createQuery([
    { key: 'size', value: size },
    { key: 'x', value: longitude },
    { key: 'y', value: latitude },
    { key: 'radius', value: radius }
  ]);
  const url = `${searchByKeyword}?query=${keyword}&${query}`;
  return axios.get(url, {
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_MAP_REST_KEY}`,
    }
  });
}