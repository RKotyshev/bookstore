import { IFilterSortType } from '../../../core/interfaces/sorting';


export const DEFAULT_FILTER_TYPE = 'id';

export const FilterSortTypeList: IFilterSortType[] = [
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
    value: 'releaseDate',
  },
  {
    label: 'Writing date',
    value: 'writingDate',
  },
];
