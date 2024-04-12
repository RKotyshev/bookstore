import { ICartItem } from './cart';

export interface IResponse<T> {
  links: {
    next: string,
    previous: string | null,
  },
  total_items: number,
  total_pages: number,
  page: number,
  page_size: number,
  result: T[],
}

export interface ICartResponse {
  total: number,
  persons_discounted_price: number,
  products: ICartItem[],
}
