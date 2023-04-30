export type InventoryStatus = "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";

export interface IProduct {
  name: string;
  code: string;
  image: string;
  price: number;
  category: string;
  inventoryStatus: InventoryStatus;
  rating: number;
  reviews: number;
  description: string;
}

export interface IColumnFilter {
  value: string;
  label: string;
}

export interface IMultiText {
  id: number | string;
  normalText: string;
  text: string;
}

export interface IExampleWebsite {
  [index: number]: string;
}

export interface IResponse {
  error: string;
}
