import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject, catchError, takeUntil } from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';
import { ICreateBookForm } from '../../../core/interfaces/book';
import { datesCompareValidator } from '../../../core/functions/validators/dates-compare-validator';
import { formatDate } from '../utils/format-date';
import { handleError } from '../../../core/functions/handle-error';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss',
})
export class BookCreateComponent implements OnInit, OnDestroy {
  public submitted: boolean = false;
  public submitError: boolean = false;
  public redirectDelaySeconds: number = 9;
  public bookForm!: FormGroup<ICreateBookForm>;
  public genres$: Observable<IGenre[]> = this._genresService.getPaginatedGenres(0, 100);
  public authors$: Observable<IAuthor[]> = this._authorsService.getPaginatedAuthors(0, 100);
  private _destroyed = new Subject<void>;
  
  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _genresService: GenresService,
    private _authorsService: AuthorsService,
    private _booksService: BooksService,
    private _router: Router,
  ) { }

  public get in_stock(): FormControl<number> {
    return this.bookForm.get('in_stock') as FormControl;
  }

  public get title(): FormControl<string> {
    return this.bookForm.get('title') as FormControl;
  }

  public get description(): FormControl<string> {
    return this.bookForm.get('description') as FormControl;
  }

  public get price(): FormControl<number> {
    return this.bookForm.get('price') as FormControl;
  }

  public get genres(): FormControl<number[]> {
    return this.bookForm.get('genres') as FormControl;
  }
  
  public get author(): FormControl<number[]> {
    return this.bookForm.get('author') as FormControl;
  }
  
  public get release_date(): FormControl<string> {
    return this.bookForm.get('release_date') as FormControl;
  }
  
  public get writing_date(): FormControl<string> {
    return this.bookForm.get('writing_date') as FormControl;
  }
  
  public ngOnInit(): void {
    this._initForm();
  }
  
  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('maxlength')) {
      return 'Number of characters exceeded';
    }

    if (control.hasError('min')) {
      return 'Value can`t be less then zero';
    }

    return 'Incorrect value';
  }

  public onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    const correctReleaseDate = formatDate(this.release_date.value);
    const correctWritingDate = formatDate(this.writing_date.value);
    this.release_date.setValue(correctReleaseDate);
    this.writing_date.setValue(correctWritingDate);

    this._booksService.postBook(this.bookForm.getRawValue()).pipe(
      catchError(handleError),
      takeUntil(this._destroyed),
    ).subscribe({
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

  private _initForm(): void {
    this.bookForm = this._formBuilder.group({
      in_stock: [0, [Validators.required, Validators.min(0)]],
      title: ['', [Validators.required, Validators.maxLength(25)]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      genres: [<number[]>[], [Validators.required]],
      author: [<number[]>[], [Validators.required]],
      release_date: ['', [Validators.required]],
      writing_date: ['', [Validators.required]],
    }, { validators: datesCompareValidator('writing_date', 'release_date') });
  }
}
