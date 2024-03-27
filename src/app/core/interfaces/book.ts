import { FormControl } from '@angular/forms';
import { IInputFileItem } from '../components/input-file/interfaces/input-file-item';

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

export interface IBookWithCover extends IBook {
  cover?: string[];
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
  cover?: FormControl<IInputFileItem[] | null>,
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
  filterType?: FormControl<string>,
  direction?: FormControl<string>,
}

export interface IRequestBook {
  title?: string | null,
  price_gte?: number | null,
  price_lte?: number | null,
  genre?: string | null,
  author?: string | null,
  release_date_gte?: string | null,
  release_date_lte?: string | null,
  writing_date_gte?: string | null,
  writing_date_lte?: string | null,
  ordering?: string,
  page?: number,
  page_size?: number,
  filterType?: string,
  direction?: string,
}
