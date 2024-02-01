import { Component, OnDestroy, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { Subject, takeUntil } from 'rxjs';

import { AuthorsService } from '../../core/services/authors.service';
import { IAuthor, IAuthorResponse } from '../../core/interfaces/author';
import { PageSizeOptions } from '../../utils/constants/paginator';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss',
})
export class AuthorsComponent implements OnInit, OnDestroy {
  public currentAuthorsList: IAuthor[] = [];
  public totalAuthors!: number;
  public pageStartIndex = 0;
  public pageStartSize = 5;
  public pageSize = PageSizeOptions;
  private _destroyed = new Subject<void>();

  constructor(private _authorService: AuthorsService) {}

  public ngOnInit(): void {
    this._getAuthorsCount();
    this._getAuthors(this.pageStartIndex, this.pageStartSize);
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public getPaginatorData(event: PageEvent):void {
    this._getAuthors(event.pageIndex, event.pageSize);
  }

  private _getAuthorsCount() {
    this._authorService.getAuthorsData()
      .pipe(takeUntil(this._destroyed))
      .subscribe((response: IAuthorResponse) => this.totalAuthors = response.total_items);
  }

  private _getAuthors(pageIndex: number, pageSize: number):void {
    this._authorService.getPaginatedAuthors(pageIndex, pageSize)
      .pipe(takeUntil(this._destroyed))
      .subscribe((authors: IAuthor[]) => this.currentAuthorsList = authors);
  }

}
