import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthorsService } from '../../../core/services/authors.service';
import { Observable } from 'rxjs';
import { IAuthor } from '../../../core/interfaces/author';
import { GenresService } from '../../../core/services/genres.service';
import { IGenre } from '../../../core/interfaces/genre';


@Component({
  selector: 'app-book-create-reactive',
  templateUrl: './book-create-reactive.component.html',
  styleUrl: './book-create-reactive.component.scss',
})
export class BookCreateReactiveComponent {
  public submitted: boolean = false;
  public bookForm = this._formBuilder.group({
    title: this._formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(25)],
    }),
    description: this._formBuilder.control('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    author: this._formBuilder.control([], {
      nonNullable: true,
      validators: Validators.required,
    }),
    genres: this._formBuilder.control([], {
      nonNullable: true,
      validators: Validators.required,
    }),
    writing_date: [''],
    release_date: [''],
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
  public authors$: Observable<IAuthor[]> = this._authorsService.getPaginatedAuthors(0, 100);
  public genres$: Observable<IGenre[]> = this._genresService.getPaginatedGenres(0, 100);

  constructor(
    private _formBuilder: FormBuilder,
    private _authorsService: AuthorsService,
    private _genresService: GenresService,
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
}
