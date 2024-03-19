import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject, catchError, from, takeUntil } from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';
import { IBook, ICreateBookForm } from '../../../core/interfaces/book';
import { datesCompareValidator } from '../../../core/functions/validators/dates-compare-validator';
import { formatDate } from '../utils/format-date';
import { handleError } from '../../../core/functions/handle-error';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';


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
  public imageReady: boolean = false;
  public imageUrl!: string;
  private _destroyed = new Subject<void>;
  
  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _genresService: GenresService,
    private _authorsService: AuthorsService,
    private _booksService: BooksService,
    private _router: Router,
    private _storage: Storage,
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

  public uploadFile(input: HTMLInputElement): void {
    if (!input.files) {
      return;
    }

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);

      if (file) {
        const storageRef = ref(this._storage, file.name);
        uploadBytesResumable(storageRef, file);
        const link = getDownloadURL(storageRef);
        from(link).subscribe((url: string) => {
          this.imageReady = true;
          this.imageUrl = url;
          console.log(url);
        });
        
      }
    }
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
