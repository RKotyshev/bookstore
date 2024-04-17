import { FormControl } from '@angular/forms';
import { IInputItem } from '../components/input-file/interfaces/input-item';


export interface IBook {
  id?: number,
  inStock: number,
  title: string,
  description: string,
  price: number,
  genres: number[],
  author: number[],
  releaseDate: string,
  writingDate: string,
}

export interface IBookWithCover extends IBook {
  cover?: string[];
}

export interface ICreateBookForm {
  inStock: FormControl<number>,
  title: FormControl<string>,
  description: FormControl<string>,
  price: FormControl<number>,
  genres: FormControl<number[]>,
  author: FormControl<number[]>,
  releaseDate: FormControl<string>,
  writingDate: FormControl<string>,
  cover?: FormControl<IInputItem[] | null>,
} 

export interface IFilterBookForm {
  title: FormControl<string | null>,
  priceGte: FormControl<number | null>,
  priceLte: FormControl<number | null>,
  genre: FormControl<string | null>,
  author: FormControl<string | null>,
  releaseDateGte: FormControl<string | null>,
  releaseDateLte: FormControl<string | null>,
  writingDateGte: FormControl<string | null>,
  writingDateLte: FormControl<string | null>,
  filterType?: FormControl<string>,
  direction?: FormControl<string>,
}

export interface IRequestBook {
  title?: string | null,
  priceGte?: number | null,
  priceLte?: number | null,
  genre?: string | null,
  author?: string | null,
  releaseDateGte?: string | null,
  releaseDateLte?: string | null,
  writingDateGte?: string | null,
  writingDateLte?: string | null,
  ordering?: string,
  page?: number,
  pageSize?: number,
  filterType?: string,
  direction?: string,
}
