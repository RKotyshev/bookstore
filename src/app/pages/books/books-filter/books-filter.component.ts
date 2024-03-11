import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable, switchMap } from 'rxjs';

import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';
import { IFilterBookForm } from '../../../core/interfaces/book';
import { BooksSortList } from '../../../utils/constants/sorting';


@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrl: './books-filter.component.scss',
})
export class BooksFilterComponent implements OnInit {
  public filterForm!: FormGroup<IFilterBookForm>;
  public authors$!: Observable<IAuthor[]>;
  public genres$!: Observable<IGenre[]>;
  public sortList: string[] = BooksSortList;

  constructor(
    private _formBuilder: FormBuilder,
    private _authorsService: AuthorsService,
    private _genresService: GenresService,
  ) {}

  public get author(): FormControl {
    return this.filterForm.get('author') as FormControl;
  }
  
  public ngOnInit(): void {
    this._initForm();
    this.authors$ = this.author.valueChanges.pipe(
      switchMap((term: string) => this._authorsService.getSuggestedAuthors(term)),
    );
    this.genres$ = this._genresService.getPaginatedGenres(0, 100);
  }

  private _initForm(): void {
    this.filterForm = this._formBuilder.group<IFilterBookForm>({
      title: this._formBuilder.control({ 
        value: null, 
        disabled: false,
      }),
      author: this._formBuilder.control({
        value: null,
        disabled: false,
      }),
      genre: this._formBuilder.control({
        value: null,
        disabled: false,
      }),
      price_lte: this._formBuilder.control({
        value: null,
        disabled: false,
      }),
      price_gte: this._formBuilder.control({
        value: null,
        disabled: false,
      }),
      writing_date_gte: this._formBuilder.control({
        value: null,
        disabled: false,
      }),
      writing_date_lte: this._formBuilder.control({
        value: null,
        disabled: false,
      }),
      release_date_gte: this._formBuilder.control({
        value: null,
        disabled: false,
      }),
      release_date_lte: this._formBuilder.control({
        value: null,
        disabled: false,
      }),
      ordering: this._formBuilder.control({
        value: null,
        disabled: false,
      }),
    });
  }
}
