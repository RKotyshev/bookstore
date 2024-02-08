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
