import { Component, OnDestroy } from '@angular/core';

import { Observable, Subject, interval, last, switchMap, take, takeUntil, tap } from 'rxjs';

import { IAuthor } from '../../../core/interfaces/author';
import { AuthorsService } from '../../../core/services/authors.service';
import { IBook, INewBook } from '../../../core/interfaces/book';
import { IGenre } from '../../../core/interfaces/genre';
import { GenresService } from '../../../core/services/genres.service';
import { BooksService } from '../../../core/services/books.service';
import moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss',
})
export class BookCreateComponent implements OnDestroy {
  public submitted: boolean = false;
  public redirectDelaySeconds: number = 9;
  public authors$: Observable<IAuthor[]> = this._authorService.getPaginatedAuthors(0, 100);
  public genres$: Observable<IGenre[]> = this._genresService.getPaginatedGenres(0, 100);
  private _destroyed = new Subject<void>;

  constructor(
    private _authorService: AuthorsService,
    private _genresService: GenresService,
    private _booksService: BooksService,
    private _router: Router,
  ) {}

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public onSubmit(book: INewBook): void {
    console.log(book);
    this._booksService.postBook({
      ...book,
      price: book.price !== null ? book.price : 200,
      in_stock: book.in_stock !== null ? book.in_stock : 0,
      writing_date: moment(book.writing_date).format('YYYY-MM-DD'),
      release_date: moment(book.release_date).format('YYYY-MM-DD'),
    }).pipe(
      switchMap((value: IBook) => {
        console.log(value);
        this.submitted = true;

        return interval(1000);
      }),
      take(this.redirectDelaySeconds),
      tap(() => this.redirectDelaySeconds--),
      last(),
    ).subscribe(() => {
      this._router.navigate(['books']);
    });
  }
}
