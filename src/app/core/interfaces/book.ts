import { FormControl } from '@angular/forms';

export interface IBook {
  id?: number,
  in_stock: number,
  title: string,
  description: string,
  price: number,
  genres: number[],
  author: number[],
  release_date: string,
  writing_date: string,
}

export interface ICreateBookForm {
  in_stock: FormControl<number>,
  title: FormControl<string>,
  description: FormControl<string>,
  price: FormControl<number>,
  genres: FormControl<number[]>,
  author: FormControl<number[]>,
  release_date: FormControl<string>,
  writing_date: FormControl<string>,
} 

export interface IFilterBookForm {
  title: FormControl<string | null>,
  price_gte: FormControl<number | null>,
  price_lte: FormControl<number | null>,
  genre: FormControl<string | null>,
  author: FormControl<string | null>,
  release_date_gte: FormControl<string | null>,
  release_date_lte: FormControl<string | null>,
  writing_date_gte: FormControl<string | null>,
  writing_date_lte: FormControl<string | null>,
  filterType?: FormControl<string | null>,
  direction?: FormControl<string | null>,
}

export interface IFilterBookValues {
  title: string | null,
  price_gte: number | null,
  price_lte: number | null,
  genre: string | null,
  author: string | null,
  release_date_gte: string | null,
  release_date_lte: string | null,
  writing_date_gte: string | null,
  writing_date_lte: string | null,
  ordering: string | null,
  // filterType?: string | null,
  // direction?: '' | '-' | null,
}

export interface IBookFilterParams {
  title?: string,
  price?: number,
  price_gte?: number,
  price_lte?: number,
  genre?: string,
  author?: string,
  release_date?: string,
  release_date_gte?: string,
  release_date_lte?: string,
  writing_date?: string,
  writing_date_gte?: string,
  writing_date_lte?: string,
  ordering?: string,
}

export interface IBookPaginatorParams {
  page?: number,
  page_size?: number,
}

export interface IBookAllParams extends IBookFilterParams, IBookPaginatorParams {}
