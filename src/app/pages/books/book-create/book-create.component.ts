import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import {
  Observable,
  Subject,
  catchError,
  finalize,
  map,
  of,
  switchMap,
  takeUntil,
  zip,
} from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor, IRequestAuthors } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';
import { IBook, IBookWithCover, ICreateBookForm } from '../../../core/interfaces/book';
import { datesCompareValidator } from '../../../core/functions/validators/dates-compare-validators';
import { handleError } from '../../../core/functions/handle-error';
import {
  acceptFileType,
  maxFileSize,
} from '../../../core/components/input-file/validators/file-validators';
import {
  IDetailedItemSize,
  IInputItem,
} from '../../../core/components/input-file/interfaces/input-item';
import { FirebaseStorageService } from '../../../core/services/firebase-storage.service';
import { IResponse } from '../../../core/interfaces/response';
import { ICanComponentDeactivate } from '../../../core/guards/can-deactivate.guard';

const DEFAULT_AUTHORS_PAGE_INDEX = 0;
const DEFAULT_AUTHORS_PAGE_SIZE = 100;


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCreateComponent implements OnInit, OnDestroy, ICanComponentDeactivate {
  public submitted: boolean = false;
  public submitError: boolean = false;
  public submitting: boolean = false;
  public redirectDelaySeconds: number = 9;
  public bookForm!: FormGroup<ICreateBookForm>;
  public authorsParamsState: IRequestAuthors = {
    page: DEFAULT_AUTHORS_PAGE_INDEX,
    pageSize: DEFAULT_AUTHORS_PAGE_SIZE,
  };
  public genres$: Observable<IGenre[]> = this._genresService.getPaginatedGenres(0, 100);
  public authors$: Observable<IAuthor[]> = this._authorsService.getAuthors(this.authorsParamsState)
    .pipe(
      map((response: IResponse<IAuthor>) => response.result),
    );
  public fileTypes: string[] = ['image/jpeg', 'image/png'];
  public maxFileSize: IDetailedItemSize = {
    size: 1,
    unit: 'MB',
  };

  private _destroyed = new Subject<void>;
  
  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _genresService: GenresService,
    private _authorsService: AuthorsService,
    private _booksService: BooksService,
    private _router: Router,
    private _storage: FirebaseStorageService,
    private _cdr: ChangeDetectorRef,
  ) { }

  public get inStockControl(): FormControl<number> {
    return this.bookForm.get('inStock') as FormControl;
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
    return this.bookForm.get('releaseDate') as FormControl;
  }
  
  public get writingDateControl(): FormControl<string> {
    return this.bookForm.get('writingDate') as FormControl;
  }

  public get coverControl(): FormControl<IInputItem[] | null> {
    return this.bookForm.get('cover') as FormControl;
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

    return 'Incorrect value';
  }

  public onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    this.submitting = true;

    const coversUpload$ = this.coverControl.value?.length ? 
      zip(this.coverControl.value.map((current: IInputItem) => {
        return this._storage.uploadItems(current);
      })) : of(['']);

    coversUpload$.pipe(
      switchMap((coversLinks: string[]) => {
        const newBook: IBookWithCover = {
          ...this.bookForm.getRawValue(),
          cover: coversLinks,
        };
        
        delete newBook.cover;

        return this._booksService.postBook(newBook as IBook);
      }),
      catchError(handleError),
      finalize(() => {
        this._cdr.detectChanges();
      }),
      takeUntil(this._destroyed),
    )
      .subscribe({
        next: () => {
          this.submitted = true;
          this.submitError = false;
          
          this.bookForm.markAsPristine();
        },
        error: () => {
          this.submitError = true;
        },
      });
  }

  public onRedirect(): void {
    this._router.navigate(['books']);
  }

  public getCoverControlInvalidItems(errors: ValidationErrors | null): IInputItem[] | null {
    if(!errors) {
      return null;
    }
  
    const invalidItemsArrays = Object.values(errors);
    const uniqueInvalidItems = invalidItemsArrays.reduce(
      (itemsSet: Set<IInputItem>, currentValidatorItems: IInputItem[]) => {
        currentValidatorItems.forEach((currentItem: IInputItem) => {
          itemsSet.add(currentItem);
        });
  
        return itemsSet;
      }, new Set());
  
    return Array.from(uniqueInvalidItems.values());
  }

  public canDeactivate(): boolean {
    return this.bookForm.pristine;
  }

  private _initForm(): void {
    this.bookForm = this._formBuilder.group<ICreateBookForm>({
      inStock: this._formBuilder.control({
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
      releaseDate: this._formBuilder.control({
        value: '',
        disabled: false,
      }, {
        validators: [Validators.required],
      }),
      writingDate: this._formBuilder.control({
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
    }, { validators: datesCompareValidator('writingDate', 'releaseDate') });
  }
}
