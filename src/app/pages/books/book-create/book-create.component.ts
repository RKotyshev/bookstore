import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  Observable,
  Subject,
  catchError,
  map,
  of,
  switchMap,
  takeUntil,
  zip,
} from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';
import { IBook, IBookWithCover, ICreateBookForm } from '../../../core/interfaces/book';
import { datesCompareValidator } from '../../../core/functions/validators/dates-compare-validators';
import { handleError } from '../../../core/functions/handle-error';
import {
  IFileSize,
  acceptFileType,
  maxFileSize,
} from '../../../core/components/input-file/functions/validators/file-validators';
import { IInputFileItem } from '../../../core/components/input-file/interfaces/input-file-item';
import { FirebaseStorageService } from '../../../core/services/firebase-storage.service';
import { getInvalidItems } from '../../../core/components/input-file/functions/get-invalid-items';


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
  public fileTypes: string[] = ['image/jpeg', 'image/png'];
  // public fileTypes: string[] = ['image/jpeg'];
  public maxFileSize: IFileSize = {
    size: 52,
    unit: 'KB',
  };
  public invalidInputItems: IInputFileItem[] = [];
  private _destroyed = new Subject<void>;
  
  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _genresService: GenresService,
    private _authorsService: AuthorsService,
    private _booksService: BooksService,
    private _router: Router,
    private _storage: FirebaseStorageService,
  ) { }

  public get inStockControl(): FormControl<number> {
    return this.bookForm.get('in_stock') as FormControl;
  }

  public get titleControl(): FormControl<string> {
    return this.bookForm.get('title') as FormControl;
  }

  public get descriptionControl(): FormControl<string> {
    return this.bookForm.get('description') as FormControl;
  }

  public get priceControl(): FormControl<number> {
    return this.bookForm.get('price') as FormControl;
  }

  public get genresControl(): FormControl<number[]> {
    return this.bookForm.get('genres') as FormControl;
  }
  
  public get authorControl(): FormControl<number[]> {
    return this.bookForm.get('author') as FormControl;
  }
  
  public get releaseDateControl(): FormControl<string> {
    return this.bookForm.get('release_date') as FormControl;
  }
  
  public get writingDateControl(): FormControl<string> {
    return this.bookForm.get('writing_date') as FormControl;
  }

  public get coverControl(): FormControl<IInputFileItem[] | null> {
    return this.bookForm.get('cover') as FormControl;
  }
  
  public ngOnInit(): void {
    this._initForm();

    this.coverControl.valueChanges.pipe(
      map(() => {
        const errors = this.coverControl.errors;

        const invalidItems = getInvalidItems(errors);
      
        return invalidItems;
      }),
      takeUntil(this._destroyed),
    ).subscribe((invalidItems: IInputFileItem[] | null) => {
      this.invalidInputItems = invalidItems ?? [];
    });
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

    return 'Incorrect value';
  }

  public onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    const coversToUpload = this.coverControl.value?.map((current: IInputFileItem) => {
      return this._storage.uploadItems(current);
    });

    zip(...coversToUpload ?? [of('')]).pipe(
      switchMap((coversLinks: string[]) => {
        const newBook: IBookWithCover = {
          ...this.bookForm.getRawValue(),
          cover: coversLinks,
        };

        delete newBook.cover;

        return this._booksService.postBook(newBook as IBook);
      }),
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
    this.bookForm = this._formBuilder.group<ICreateBookForm>({
      in_stock: this._formBuilder.control({
        value: 0,
        disabled: false,
      }, {
        validators: [Validators.required, Validators.min(0)],
      }),
      title: this._formBuilder.control({
        value: '',
        disabled: false,
      }, {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      description: this._formBuilder.control({
        value: '',
        disabled: false,
      }, {
        validators: [Validators.required],
      }),
      price: this._formBuilder.control({
        value: 0,
        disabled: false,
      }, {
        validators: [Validators.required, Validators.min(0)],
      }),
      genres: this._formBuilder.control({
        value: [],
        disabled: false,
      }, {
        validators: [Validators.required],
      }),
      author: this._formBuilder.control({
        value: [],
        disabled: false,
      }, {
        validators: [Validators.required],
      }),
      release_date: this._formBuilder.control({
        value: '',
        disabled: false,
      }, {
        validators: [Validators.required],
      }),
      writing_date: this._formBuilder.control({
        value: '',
        disabled: false,
      }, {
        validators: [Validators.required],
      }),
      cover: this._formBuilder.control({
        value: null,
        disabled: false,
      }, {
        validators: [maxFileSize(this.maxFileSize), acceptFileType(this.fileTypes)],
      }),
    }, { validators: datesCompareValidator('writing_date', 'release_date') });
  }
}
