import { Component } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthorsService } from '../../../core/services/authors.service';
import { Observable } from 'rxjs';
import { IAuthor } from '../../../core/interfaces/author';
import { GenresService } from '../../../core/services/genres.service';
import { IGenre } from '../../../core/interfaces/genre';
// import { INewBook } from '../../../core/interfaces/book';


@Component({
  selector: 'app-book-create-reactive',
  templateUrl: './book-create-reactive.component.html',
  styleUrl: './book-create-reactive.component.scss',
})
export class BookCreateReactiveComponent {
  public submitted: boolean = false;
  public bookForm = this._formBuilder.group({
    title: this._formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(25)],
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
  });
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
  public authors$: Observable<IAuthor[]> = this._authorsService.getPaginatedAuthors(0, 100);
  public genres$: Observable<IGenre[]> = this._genresService.getPaginatedGenres(0, 100);
  
  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _authorsService: AuthorsService,
    private _genresService: GenresService,
  ) { }
    
  // public getTitleValue(): string {
  //   return this.bookForm.get('title')?.value;
  // }
  
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
    console.log(this.bookForm);
  }
}
