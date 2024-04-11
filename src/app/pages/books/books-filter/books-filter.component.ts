import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';

import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';
import { IFilterBookForm, IRequestBook } from '../../../core/interfaces/book';
import {
  IFilterSortType,
  SortDirection,
} from '../../../core/interfaces/sorting';
import { formatDate } from '../utils/format-date';
import { DEFAULT_FILTER_TYPE, FilterSortTypeList } from '../constants/filter';


@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrl: './books-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksFilterComponent implements OnInit, OnChanges {
  @Input()
  public inputFilterValues!: IRequestBook | null;

  @Output() 
  public filterValueChange = new EventEmitter<IRequestBook>();
  
  public filterForm!: FormGroup<IFilterBookForm>;
  public authors$!: Observable<IAuthor[]>;
  public genres$!: Observable<IGenre[]>;
  public sortList: IFilterSortType[] = FilterSortTypeList;
  public readonly sortDirection = SortDirection;

  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _authorsService: AuthorsService,
    private _genresService: GenresService,
  ) {}

  public get authorControl(): FormControl<string | null> {
    return this.filterForm.get('author') as FormControl<string | null>;
  }

  public ngOnChanges(): void {
    this._setFormDefaultValue();
  }

  public ngOnInit(): void {
    this._initForm();

    this.authors$ = this.authorControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string | null) => this._authorsService.getSuggestedAuthors(term)),
    );

    this.genres$ = this._genresService.getPaginatedGenres(0, 100);
  }

  public onSubmit(): void {
    const formValue = {
      ...this.filterForm.getRawValue(),
    };

    this.filterValueChange.emit(formValue);
  }

  public onReset(): void {
    this.filterForm.reset();
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
      filterType: this._formBuilder.control({
        value: DEFAULT_FILTER_TYPE,
        disabled: false,
      }),
      direction: this._formBuilder.control({
        value: this.sortDirection.Ascending,
        disabled: false,
      }),
    });
  }

  private _setFormDefaultValue(): void {
    this.filterForm?.setValue({
      title: this.inputFilterValues?.title ?? null,
      author: this.inputFilterValues?.author ?? null,
      genre: this.inputFilterValues?.genre ?? null,
      price_lte: this.inputFilterValues?.price_lte ?? null,
      price_gte: this.inputFilterValues?.price_gte ?? null,
      writing_date_lte: this.inputFilterValues?.writing_date_lte ?
        formatDate(this.inputFilterValues?.writing_date_lte) : 
        null,
      writing_date_gte: this.inputFilterValues?.writing_date_gte ?
        formatDate(this.inputFilterValues?.writing_date_gte) : 
        null,
      release_date_lte: this.inputFilterValues?.release_date_lte ?
        formatDate(this.inputFilterValues?.release_date_lte) :
        null,
      release_date_gte: this.inputFilterValues?.release_date_gte ?
        formatDate(this.inputFilterValues?.release_date_gte) :
        null,
      filterType: this.inputFilterValues?.filterType ?? DEFAULT_FILTER_TYPE,
      direction: this.inputFilterValues?.direction ?? this.sortDirection.Ascending,
    });
  }
}
