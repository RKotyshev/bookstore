export interface IAuthor {
  id: number,
  first_name: string,
  second_name: string,
}

export interface IRequestAuthors {
  page: number,
  page_size: number,
}
