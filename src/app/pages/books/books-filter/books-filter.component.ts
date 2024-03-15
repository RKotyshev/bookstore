import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Observable, Subject, debounceTime, filter, switchMap, takeUntil } from 'rxjs';

import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';
import { IFilterBookForm, IRequestBook } from '../../../core/interfaces/book';
import { BooksSortList, IFilterType, SortDirection } from '../../../utils/constants/sorting';
import { formatDate } from '../utils/format-date';

function isNotNull(value: string | null): value is string {
  return value !== null;
}


@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrl: './books-filter.component.scss',
})
export class BooksFilterComponent implements OnInit, OnDestroy {
  @Output() public filterValueChange = new EventEmitter<IRequestBook>();
  public sortList: IFilterType[] = BooksSortList;
  public sortDirection = {
    ascending: SortDirection.Ascending,
    descending: SortDirection.Descending,
  };
  public filterForm!: FormGroup<IFilterBookForm>;
  public authors$!: Observable<IAuthor[]>;
  public genres$!: Observable<IGenre[]>;
  private _queryParams$: Observable<Params> = this._route.queryParams;
  private _destroyed = new Subject<void>;

  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _authorsService: AuthorsService,
    private _genresService: GenresService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {}

  public get authorControl(): FormControl<string | null> {
    return this.filterForm.get('author') as FormControl<string | null>;
  }

  public get writingDateLteControl(): FormControl<string | null> {
    return this.filterForm.get('writing_date_lte') as FormControl<string | null>;
  }

  public get writingDateGteControl(): FormControl<string | null> {
    return this.filterForm.get('writing_date_gte') as FormControl<string | null>;
  }

  public get releaseDateGteControl(): FormControl<string | null> {
    return this.filterForm.get('release_date_gte') as FormControl<string | null>;
  }

  public get releaseDateLteControl(): FormControl<string | null> {
    return this.filterForm.get('release_date_lte') as FormControl<string | null>;
  }

  public ngOnInit(): void {
    this._initForm();

    this.authors$ = this.authorControl.valueChanges.pipe(
      debounceTime(200),
      filter(isNotNull),
      switchMap((term: string) => this._authorsService.getSuggestedAuthors(term)),
    );
    this.genres$ = this._genresService.getPaginatedGenres(0, 100);
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public onSubmit(): void {
    const releaseDateGte = formatDate(this.releaseDateGteControl.getRawValue());
    const releaseDateLte = formatDate(this.releaseDateLteControl.getRawValue());
    const writingDateGte = formatDate(this.writingDateGteControl.getRawValue());
    const writingDateLte = formatDate(this.writingDateLteControl.getRawValue());

    const completedFormRawValue = {
      ...this.filterForm.getRawValue(),
      release_date_gte: releaseDateGte || null,
      release_date_lte: releaseDateLte || null,
      writing_date_gte: writingDateGte || null,
      writing_date_lte: writingDateLte || null,
    };

    this._router.navigate(['/books'], {
      queryParams: completedFormRawValue,
      onSameUrlNavigation: undefined,
    });

    this.filterValueChange.emit(completedFormRawValue);
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
        value: 'id',
        disabled: false,
      }),
      direction: this._formBuilder.control({
        value: this.sortDirection.ascending,
        disabled: false,
      }),
    });

    this._queryParams$.pipe(
      takeUntil(this._destroyed),
    ).subscribe((params: Params) => {
      this.filterForm.setValue({
        title: params['title'] ?? null,
        author: params['author'] ?? null,
        genre: params['genre'] ?? null,
        price_lte: params['price_lte'] ?? null,
        price_gte: params['price_gte'] ?? null,
        writing_date_lte: params['writing_date_lte'] ?? null,
        writing_date_gte: params['writing_date_gte'] ?? null,
        release_date_lte: params['release_date_lte'] ?? null,
        release_date_gte: params['release_date_gte'] ?? null,
        filterType: params['filterType'] ?? 'id',
        direction: params['direction'] ?? this.sortDirection.ascending,
      });
    });
  }
}
