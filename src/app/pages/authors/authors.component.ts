import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { BehaviorSubject, Observable, debounceTime, switchMap } from 'rxjs';

import { AuthorsService } from '../../core/services/authors.service';
import { IAuthor, IRequestAuthors } from '../../core/interfaces/author';
import { IResponse } from '../../core/interfaces/response';
import { PageSizeOptions } from '../../utils/constants/paginator';

const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_PAGE_SIZE = 5;


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsComponent implements OnInit {
  public paramsState: IRequestAuthors = {
    page: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  };
  public authorsResponse$!: Observable<IResponse<IAuthor>>;
  public paginatorInitialPageSize = DEFAULT_PAGE_SIZE;
  public readonly pageSizes = PageSizeOptions;
  private _paramsUpdated = new BehaviorSubject(this.paramsState);

  constructor(private _authorService: AuthorsService) { }

  public ngOnInit(): void {
    this.authorsResponse$ = this._paramsUpdated.asObservable().pipe(
      debounceTime(300),
      switchMap((params: IRequestAuthors) => {
        return this._authorService.getAuthors(params);
      }),
    );
  }

  public paginatorUpdate(event: PageEvent): void {
    this.paramsState = {
      page: event.pageIndex,
      pageSize: event.pageSize,
    };

    this._paramsUpdated.next(this.paramsState);
  }
}
