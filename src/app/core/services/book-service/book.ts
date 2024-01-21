export interface IBook {
    id: number,
    in_stock: number,
    title: string,
    description: string,
    price: number,
    genres: number[],
    author: number[],
    release_date: string,
    writing_date: string
}

export interface IBookResponse {
    links: {
        next: string,
        previous: string
    },
    total_items: number,
    total_pages: number,
    page: number,
    page_size: number,
    result: IBook[]
}
