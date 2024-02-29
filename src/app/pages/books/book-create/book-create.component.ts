import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject, interval, last, switchMap, take, tap } from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { INewBook } from '../../../core/interfaces/book';
import { IGenre } from '../../../core/interfaces/genre';
import { formatDate } from '../utils/format-date';
// import { DateAdapter } from '@angular/material/core';

// import moment from 'moment';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss',
})
export class BookCreateComponent {
  public submitted: boolean = false;
  public submitError: boolean = false;
  public redirectDelaySeconds: number = 9;
  public authors$: Observable<IAuthor[]> = this._authorService.getPaginatedAuthors(0, 100);
  public genres$: Observable<IGenre[]> = this._genresService.getPaginatedGenres(0, 100);
  private _submittedSubject = new Subject();

  constructor(
    private _authorService: AuthorsService,
    private _genresService: GenresService,
    private _booksService: BooksService,
    private _router: Router,
    // private _adapter: DateAdapter<Date, string>,
  ) { 
    // this._adapter.setLocale('ru');
  }

  public onSubmit(book: INewBook): void {
    // const correctPrice = book.price !== null ? book.price : 200;
    const correctPrice = book.price;
    const correctInStock = book.in_stock !== null ? book.in_stock : 0;
    // const correctWritingDate = moment(book.writing_date).format('YYYY-MM-DD');
    // const correctReleaseDate = moment(book.release_date).format('YYYY-MM-DD');
    const correctWritingDate = formatDate(book.writing_date);
    const correctReleaseDate = formatDate(book.release_date);
    
    console.log(book);
    console.log({
      ...book,
      price: correctPrice,
      in_stock: correctInStock,
      writing_date: correctWritingDate,
      release_date: correctReleaseDate,
    });

    // this._booksService.postBook({
    //   ...book,
    //   price: correctPrice,
    //   in_stock: correctInStock,
    //   writing_date: correctWritingDate,
    //   release_date: correctReleaseDate,
    // }).pipe(
    //   switchMap(() => {
    //     this.submitted = true;

    //     return interval(1000);
    //   }),
    //   take(this.redirectDelaySeconds),
    //   tap(() => this.redirectDelaySeconds--),
    //   last(),
    // ).subscribe(() => {
    //   this._router.navigate(['books']);
    // });

    this._booksService.postBook({
      ...book,
      price: correctPrice,
      in_stock: correctInStock,
      writing_date: correctWritingDate,
      release_date: correctReleaseDate,
    }).subscribe({ next: (value: unknown) => {
      this.submitted = true;
      this.submitError = false;
      console.log('test');
      this._submittedSubject.next(value);
    },
    error: () => {
      this.submitError = true;
    },
    });

    if(this.submitError) {
      return;
    }
    
    this._submittedSubject.pipe(
      tap(console.log),
      switchMap(() => interval(1000)),
      take(this.redirectDelaySeconds),
      tap(() => this.redirectDelaySeconds--),
      last(),
    ).subscribe(() => {
      this._router.navigate(['books']);
    });

    this._submittedSubject.subscribe(() => console.log('newBook posted'));
  }

}
