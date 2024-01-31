export const AppBreakpoints = {
  'MVertical': '(max-width: 766.98px)',
  'MHorizontal': '(min-width: 767px) and (max-width: 991.98px)',
  'Tablet': '(min-width: 992px) and (max-width: 1199.98px)',
  'Desktop': '(min-width: 1200px)',
};

export const DisplayNameMap = new Map([
  ['(max-width: 766.98px)', 'isMVertical'],
  ['(min-width: 767px) and (max-width: 991.98px)', 'isMHorizontal'],
  ['(min-width: 992px) and (max-width: 1199.98px)', 'isTablet'],
  ['(min-width: 1200px)', 'isDesktop'],
]);
