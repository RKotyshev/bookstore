import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Observable, Subject, filter, switchMap, takeUntil } from 'rxjs';

import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';
import { IFilterBookForm, IRequestBook } from '../../../core/interfaces/book';
import { BooksSortList, IFilterType } from '../../../utils/constants/sorting';
import { formatDate } from '../utils/format-date';


@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrl: './books-filter.component.scss',
})
export class BooksFilterComponent implements OnInit, OnDestroy {
  @Output() public filterValueChange = new EventEmitter<IRequestBook>();
  public sortList: IFilterType[] = BooksSortList;
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

  public get titleControl(): FormControl<string | null> {
    return this.filterForm.get('title') as FormControl<string | null>;
  }

  public get authorControl(): FormControl {
    return this.filterForm.get('author') as FormControl;
  }

  public get genreControl(): FormControl<string | null> {
    return this.filterForm.get('genre') as FormControl<string | null>;
  }

  public get priceLteControl(): FormControl<number | null> {
    return this.filterForm.get('price_lte') as FormControl<number | null>;
  }
  
  public get priceGteControl(): FormControl<number | null> {
    return this.filterForm.get('price_gte') as FormControl<number | null>;
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

  public get filterTypeControl(): FormControl<string> {
    return this.filterForm.get('filterType') as FormControl<string>;
  }

  public get directionControl(): FormControl<string> {
    return this.filterForm.get('direction') as FormControl<string>;
  }

  public ngOnInit(): void {
    this._initForm();
    this.authors$ = this.authorControl.valueChanges.pipe(
      filter((term: string ) => term !== null),
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
    const ordering = this.directionControl.getRawValue() + this.filterTypeControl.getRawValue();

    this._router.navigate(['/books'], {
      queryParams: {
        ...this.filterForm.getRawValue(),
        release_date_gte: releaseDateGte || null,
        release_date_lte: releaseDateLte || null,
        writing_date_gte: writingDateGte || null,
        writing_date_lte: writingDateLte || null,
      },
      onSameUrlNavigation: undefined,
    });
    
    const completedFormRawValue = {
      ...this.filterForm.getRawValue(),
      ordering: ordering,
      release_date_gte: releaseDateGte,
      release_date_lte: releaseDateLte,
      writing_date_gte: writingDateGte,
      writing_date_lte: writingDateLte,
    };

    delete completedFormRawValue.filterType;
    delete completedFormRawValue.direction;

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
        value: '',
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
        direction: params['direction'] ?? '',
      });
    });
  }
}
