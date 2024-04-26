import { ICartItem } from './cart';


export interface IResponse<T> {
  links: {
    next: string,
    previous: string | null,
  },
  totalItems: number,
  totalPages: number,
  page: number,
  pageSize: number,
  result: T[],
}

export interface ICartResponse {
  total: number,
  personsDiscountedPrice: number,
  products: ICartItem[],
}
