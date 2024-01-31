import { InjectionToken } from '@angular/core';


export type PageSize = number[];

export const PAGE_SIZE_OPTIONS = new InjectionToken<PageSize>('Page size paginator options');
