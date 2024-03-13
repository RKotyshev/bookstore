import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable, filter, switchMap } from 'rxjs';

import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';
import { IFilterBookForm, IRequestBook } from '../../../core/interfaces/book';
import { BooksSortList, IFilterType } from '../../../utils/constants/sorting';
// import { BooksService } from '../../../core/services/books.service';
import { formatDate } from '../utils/format-date';


@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrl: './books-filter.component.scss',
})
export class BooksFilterComponent implements OnInit {
  @Output() public filterValueChange = new EventEmitter<IRequestBook>();
  public filterForm!: FormGroup<IFilterBookForm>;
  public sortList: IFilterType[] = BooksSortList;
  public authors$!: Observable<IAuthor[]>;
  public genres$!: Observable<IGenre[]>;
  private _queryParams$: Observable<Params> = this._route.queryParams;
  private _params!: Params;
  // public query!: Params;

  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _authorsService: AuthorsService,
    private _genresService: GenresService,
    // private _booksService: BooksService,
    private _route: ActivatedRoute,
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
    // this.query = this._route.snapshot.queryParams;
    // this.filterForm.get('title')?.setValue(this.query['title']);
  }

  public onSubmit(): void { 
    const releaseDateGte = formatDate(this.releaseDateGteControl.getRawValue());
    const releaseDateLte = formatDate(this.releaseDateLteControl.getRawValue());
    const writingDateGte = formatDate(this.writingDateGteControl.getRawValue());
    const writingDateLte = formatDate(this.writingDateLteControl.getRawValue());
    const ordering = this.directionControl.getRawValue() + this.filterTypeControl.getRawValue();
    
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

    console.log(completedFormRawValue);

    this.filterValueChange.emit(completedFormRawValue);

    // this._booksService.getBooksList(completedFormRawValue).subscribe(console.log);
  }

  public onReset(): void {
    this.filterForm.reset();
  }

  private _initForm(): void {
    this.filterForm = this._formBuilder.group<IFilterBookForm>({
      title: this._formBuilder.control({ 
        value: this._params?.['title'] || null, 
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

    this._queryParams$.subscribe((params: Params) => {
      this._setQueryValue(params);
    });
  }

  private _setQueryValue(params: Params): void {
    // const direction: boolean = params['ordering']?.startsWith('-');
    // const filterTypeValue: string = direction ? params['ordering'].slice(1) : params['ordering'];
    // const directionValue: string = direction ? '-' : '';

    this.filterForm.setValue({
      title: params['title'] ?? null,
      author: params['author'] ?? null,
      genre: params['genre'] ?? null,
      price_lte: params['params_lte'] ?? null,
      price_gte: params['params_gte'] ?? null,
      writing_date_lte: params['writing_date_lte'] ?? null,
      writing_date_gte: params['writing_date_gte'] ?? null,
      release_date_lte: params['release_date_lte'] ?? null,
      release_date_gte: params['release_date_gte'] ?? null,
      filterType: params['filterType'] ?? 'id',
      direction: params['direction'] ?? '',
    });

    // this.titleControl.setValue(params['title'] ?? null);
    // this.authorControl.setValue(params['author']);
    // this.genreControl.setValue(params['genre']);
    // this.priceLteControl.setValue(params['price_lte']);
    // this.priceGteControl.setValue(params['price_gte']);
    // this.writingDateLteControl.setValue(params['writing_date_lte']);
    // this.writingDateGteControl.setValue(params['writing_date_gte']);
    // this.releaseDateGteControl.setValue(params['release_date_gte']);
    // this.releaseDateLteControl.setValue(params['release_date_lte']);
    // this.filterTypeControl.setValue(filterTypeValue ?? 'id');
    // this.directionControl.setValue(directionValue);
  }
}
