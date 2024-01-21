import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorService } from '../../core/author-service/author.service';
import { IAuthor, IAuthorResponse } from '../../core/author-service/author';
import { PageEvent } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-authors-page',
  templateUrl: './authors-page.component.html',
  styleUrl: './authors-page.component.scss',
})
export class AuthorsPageComponent implements OnInit, OnDestroy {
  public currentAuthorsList: IAuthor[] = [];
  public totalAuthors!: number;
  public pageStartIndex = 0;
  public pageStartSize = 5;
  private _destroyed = new Subject<void>();

  constructor(private _authorService: AuthorService) {}

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
    this._authorService.getAuthorsResponse()
      .pipe(takeUntil(this._destroyed))
      .subscribe((response: IAuthorResponse) => this.totalAuthors = response.total_items);
  }

  private _getAuthors(pageIndex: number, pageSize: number):void {
    this._authorService.getPaginationAuthors(pageIndex, pageSize)
      .pipe(takeUntil(this._destroyed))
      .subscribe((authors: IAuthor[]) => this.currentAuthorsList = authors);
  }

}
