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
