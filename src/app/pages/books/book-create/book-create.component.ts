import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  Observable,
  Subject,
  catchError,
  concatMap,
  distinctUntilChanged,
  filter,
  takeUntil,
} from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';
import { IBook, ICreateBookForm } from '../../../core/interfaces/book';
import { datesCompareValidator } from '../../../core/functions/validators/dates-compare-validators';
import { formatDate } from '../utils/format-date';
import { handleError } from '../../../core/functions/handle-error';
import {
  acceptFileType,
  maxFileSize,
} from '../../../core/functions/validators/file-validators';
import { IItem } from '../../../core/interfaces/item';
import { FirebaseStorageService } from '../../../core/services/firebase-storage.service';

function isNotNull(value: IItem[] | null): value is IItem[] {
  return value !== null;
}


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
  public imageTypes: string[] = ['image/jpeg'];
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

  public get coverControl(): FormControl<IItem[] | null> {
    return this.bookForm.get('cover') as FormControl;
  }
  
  public ngOnInit(): void {
    this._initForm();

    this.coverControl.valueChanges.pipe(
      filter(isNotNull),
      filter(() => this.coverControl.valid),
      distinctUntilChanged((prevItems: IItem[], currItems: IItem[]) => {
        const prevNames = prevItems.map((item: IItem) => item.name).join('');
        const currNames = currItems.map((item: IItem) => item.name).join('');

        console.log(`prev names: ${prevNames}`);
        console.log(`current names: ${currNames}`);
        
        return prevNames === currNames;
      }),
      concatMap((items: IItem[]) => {
        console.log(`input items: ${JSON.stringify(items)}`);

        return this._storage.uploadItems(items);
      }),
    ).subscribe((items: IItem[]) => {
      console.log(`output items: ${JSON.stringify(items)}`);

      this.coverControl.setValue(items);
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

    const correctReleaseDate = formatDate(this.releaseDateControl.value);
    const correctWritingDate = formatDate(this.writingDateControl.value);

    const newBook: IBook = {
      ...this.bookForm.getRawValue(),
      release_date: correctReleaseDate,
      writing_date: correctWritingDate,
    };

    this._booksService.postBook(newBook).pipe(
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

  public onDeleteItem(item: IItem): void {
    this._storage.deleteItem(item).subscribe(() => {
      let updatedItems: IItem[] | undefined | null = this.coverControl.value?.filter(
        (currentItem: IItem) => {
          return item.name !== currentItem.name;
        });

      if(!updatedItems) {
        updatedItems = null;
      }

      this.coverControl.setValue(updatedItems);
    });
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
        validators: [maxFileSize(5100000), acceptFileType(this.imageTypes)],
      }),
    }, { validators: datesCompareValidator('writing_date', 'release_date') });
  }
}
