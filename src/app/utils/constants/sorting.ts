export interface IFilterType {
  label: string,
  value: string,
}

export const BooksSortList: IFilterType[] = [
  {
    label: 'ID',
    value: 'id',
  },
  {
    label: 'Price',
    value: 'price',
  },
  {
    label: 'Release date',
    value: 'release_date',
  },
  {
    label: 'Writing date',
    value: 'writing_date',
  },
];

export const enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}
