import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { from, map, mergeMap, switchMap, tap } from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import { IBook } from '../../../core/interfaces/book';
import { AuthorsService } from '../../../core/services/authors.service';
import { IAuthor } from '../../../core/interfaces/author';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  public book!: IBook;
  public authors: IAuthor[] = [];
  
  constructor(
    private _route: ActivatedRoute,
    private _booksService: BooksService,
    private _authorService: AuthorsService,
  ) {}
  
  public ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this._route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => this._booksService.getBook(paramMap.get('id')!)),
      tap((book: IBook) => this.book = book),
      map((book: IBook) => book.author),
      switchMap((authors: number[]) => from(authors)),
      mergeMap((authorId: number) => this._authorService.getAuthor(authorId)),
      tap((author: IAuthor) => this.authors.push(author)),
    ).subscribe();
  }
}
