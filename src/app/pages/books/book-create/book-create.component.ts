import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AsyncSubject, Observable, interval, last, switchMap, take, tap } from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IBook, INewBook } from '../../../core/interfaces/book';
import { IGenre } from '../../../core/interfaces/genre';
import { formatDate } from '../utils/format-date';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss',
})
export class BookCreateComponent implements OnInit {
  public submitted: boolean = false;
  public submitError: boolean = false;
  public redirectDelaySeconds: number = 9;
  public authors$: Observable<IAuthor[]> = this._authorService.getPaginatedAuthors(0, 100);
  public genres$: Observable<IGenre[]> = this._genresService.getPaginatedGenres(0, 100);
  private _submittedSubject = new AsyncSubject();

  constructor(
    private _authorService: AuthorsService,
    private _genresService: GenresService,
    private _booksService: BooksService,
    private _router: Router,
  ) { }

  public ngOnInit(): void {
    this._submittedSubject.pipe(
      switchMap(() => interval(1000)),
      take(this.redirectDelaySeconds),
      tap(() => this.redirectDelaySeconds--),
      last(),
    ).subscribe(() => {
      this._router.navigate(['books']);
    });
  }

  public onSubmit(book: INewBook): void {
    const correctPrice = book.price !== null ? book.price : 200;
    const correctInStock = book.in_stock !== null ? book.in_stock : 0;
    const correctWritingDate = formatDate(book.writing_date);
    const correctReleaseDate = formatDate(book.release_date);

    this._booksService.postBook({
      ...book,
      price: correctPrice,
      in_stock: correctInStock,
      writing_date: correctWritingDate,
      release_date: correctReleaseDate,
    }).subscribe({ 
      next: (response: IBook) => {
        this.submitted = true;
        this.submitError = false;

        this._submittedSubject.next(response);
        this._submittedSubject.complete();
      },
      error: (error: Error) => {
        this.submitError = true;

        console.error(error);
      },
    });
  }

}
