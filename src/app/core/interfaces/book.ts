export interface IBook {
  id: number,
  in_stock: number,
  title: string,
  description: string,
  price: number,
  genres: number[],
  author: number[],
  release_date: string,
  writing_date: string,
}
