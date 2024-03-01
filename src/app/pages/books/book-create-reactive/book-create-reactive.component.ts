import { Component } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, interval, last, take, tap } from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';
import { DatesValidator } from '../validators/dates-validator-reactive';
import { formatDate } from '../utils/format-date';


@Component({
  selector: 'app-book-create-reactive',
  templateUrl: './book-create-reactive.component.html',
  styleUrl: './book-create-reactive.component.scss',
})
export class BookCreateReactiveComponent {
  public submitted: boolean = false;
  public submitError: boolean = false;
  public redirectDelaySeconds: number = 9;
  public bookForm = this._formBuilder.group({
    title: this._formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(25), Validators.minLength(2)],
    }),
    description: this._formBuilder.control('', {
      validators: Validators.required,
    }),
    author: this._formBuilder.control([], {
      validators: Validators.required,
    }),
    genres: this._formBuilder.control([], {
      validators: Validators.required,
    }),
    writing_date: this._formBuilder.control('', {
      validators: Validators.required,
    }),
    release_date: this._formBuilder.control('', {
      validators: Validators.required,
    }),
    in_stock: [0],
    price: [0],
  }, { validators: DatesValidator });
  public get title(): FormControl {
    return this.bookForm.get('title') as FormControl;
  }
  public get description(): FormControl {
    return this.bookForm.get('description') as FormControl;
  }
  public get author(): FormControl {
    return this.bookForm.get('author') as FormControl;
  }
  public get genres(): FormControl {
    return this.bookForm.get('genres') as FormControl;
  }
  public get writing_date(): FormControl {
    return this.bookForm.get('writing_date') as FormControl;
  }
  public get release_date(): FormControl {
    return this.bookForm.get('release_date') as FormControl;
  }
  public get in_stock(): FormControl {
    return this.bookForm.get('in_stock') as FormControl;
  }
  public get price(): FormControl {
    return this.bookForm.get('price') as FormControl;
  }
  public authors$: Observable<IAuthor[]> = this._authorsService.getPaginatedAuthors(0, 100);
  public genres$: Observable<IGenre[]> = this._genresService.getPaginatedGenres(0, 100);

  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _authorsService: AuthorsService,
    private _genresService: GenresService,
    private _booksService: BooksService,
    private _router: Router,
  ) { }

  public getErrorMessages(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('maxlength')) {
      return 'Number of characters exceeded';
    }

    return 'Incorrect value';
  }

  public onSubmit(): void {
    this.writing_date.setValue(formatDate(this.writing_date.value));
    this.release_date.setValue(formatDate(this.release_date.value));

    this._booksService.postBook(this.bookForm.getRawValue())
      .subscribe({
        next: () => {
          this.submitted = true;
          this.submitError = false;

          this.startRedirect();
        },
        error: (error: Error) => {
          this.submitError = true;
          console.error(error);
        },
      });
  }

  public onBlur(control: FormControl): void {
    if (control.value === null) {
      control.reset();
    }
  }

  public startRedirect(): void {
    interval(1000).pipe(
      take(this.redirectDelaySeconds),
      tap(() => this.redirectDelaySeconds--),
      last(),
    ).subscribe(() => {
      this._router.navigate(['books']);
    });
  }
}
