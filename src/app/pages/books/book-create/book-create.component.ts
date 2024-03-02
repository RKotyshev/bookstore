import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, catchError } from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IBook } from '../../../core/interfaces/book';
import { IGenre } from '../../../core/interfaces/genre';
import { formatDate } from '../utils/format-date';
import { handleError } from '../../../core/functions/handle-error';


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

  constructor(
    private _authorService: AuthorsService,
    private _genresService: GenresService,
    private _booksService: BooksService,
    private _router: Router,
  ) { }

  public onSubmit(book: IBook): void {
    const correctWritingDate = formatDate(book.writing_date);
    const correctReleaseDate = formatDate(book.release_date);

    this._booksService.postBook({
      ...book,
      writing_date: correctWritingDate,
      release_date: correctReleaseDate,
    }).pipe(
      catchError(handleError),
    )
      .subscribe({
        next: () => {
          this.submitted = true;
          this.submitError = false;
        },
        error: () => {
          this.submitError = true;
        },
      });
  }

  public onRedirect(): void {
    this._router.navigate(['books']);
  }

}
