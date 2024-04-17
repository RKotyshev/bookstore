export interface IBreakpointParams {
  type: string,
  params: string,
  itemsCount: number,
}

export const layoutMatcher: IBreakpointParams[] = [
  {
    type: 'MVertical',
    params: '(max-width: 766.98px)',
    itemsCount: 4,
  },
  {
    type: 'MHorizontal',
    params: '(min-width: 767px) and (max-width: 991.98px)',
    itemsCount: 6,
  },
  {
    type: 'Tablet',
    params: '(min-width: 992px) and (max-width: 1199.98px)',
    itemsCount: 8,
  },
  {
    type: 'Desktop',
    params: '(min-width: 1200px)',
    itemsCount: 10,
  },
];
