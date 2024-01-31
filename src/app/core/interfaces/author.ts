export interface IAuthor {
    id: number,
    first_name: string,
    second_name: string
}

export interface IAuthorResponse {
    links: {
        next: string,
        previous: string | null,
    },
    total_items: number,
    total_pages: number,
    page: number,
    page_size: number,
    result: IAuthor[]
}
