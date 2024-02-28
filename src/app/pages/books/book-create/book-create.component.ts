import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, interval, last, switchMap, take, tap } from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { INewBook } from '../../../core/interfaces/book';
import { IGenre } from '../../../core/interfaces/genre';

import moment from 'moment';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss',
})
export class BookCreateComponent {
  public submitted: boolean = false;
  public redirectDelaySeconds: number = 9;
  public authors$: Observable<IAuthor[]> = this._authorService.getPaginatedAuthors(0, 100);
  public genres$: Observable<IGenre[]> = this._genresService.getPaginatedGenres(0, 100);

  constructor(
    private _authorService: AuthorsService,
    private _genresService: GenresService,
    private _booksService: BooksService,
    private _router: Router,
  ) { }

  public onSubmit(book: INewBook): void {
    const correctPrice = book.price !== null ? book.price : 200;
    const correctInStock = book.in_stock !== null ? book.in_stock : 0;
    const correctWritingDate = moment(book.writing_date).format('YYYY-MM-DD');
    const correctReleaseDate = moment(book.release_date).format('YYYY-MM-DD');

    this._booksService.postBook({
      ...book,
      price: correctPrice,
      in_stock: correctInStock,
      writing_date: correctWritingDate,
      release_date: correctReleaseDate,
    }).pipe(
      switchMap(() => {
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
