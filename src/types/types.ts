export interface IMenu {
  label: string;
  onClick: () => any;
}

export interface IKakaoMapSearchResult {
  place_name: string;
  distance: string;
  place_url: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  id: string;
  phone: string;
  category_group_code: string;
  category_group_name: string;
  x: string;
  y: string;
}

export interface ISearchResult {
  name: string;
  address: string;
  longitude: string;
  latitude: string;
};