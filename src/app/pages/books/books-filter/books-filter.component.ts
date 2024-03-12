import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable, switchMap } from 'rxjs';

import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';
import { IFilterBookForm, IRequestBook } from '../../../core/interfaces/book';
import { BooksSortList, IFilterType } from '../../../utils/constants/sorting';
import { BooksService } from '../../../core/services/books.service';
import { formatDate } from '../utils/format-date';


@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrl: './books-filter.component.scss',
})
export class BooksFilterComponent implements OnInit {
  @Output() public filterValueChange: EventEmitter<IRequestBook> = new EventEmitter();
  public filterForm!: FormGroup<IFilterBookForm>;
  public authors$!: Observable<IAuthor[]>;
  public genres$!: Observable<IGenre[]>;
  public sortList: IFilterType[] = BooksSortList;

  constructor(
    private _formBuilder: FormBuilder,
    private _authorsService: AuthorsService,
    private _genresService: GenresService,
    private _booksService: BooksService,
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

  public onSubmit(): void {
    const releaseDateGte = formatDate(this.filterForm.get('release_date_gte')?.getRawValue());
    const releaseDateLte = formatDate(this.filterForm.get('release_date_lte')?.getRawValue());
    const writingDateGte = formatDate(this.filterForm.get('writing_date_gte')?.getRawValue());
    const writingDateLte = formatDate(this.filterForm.get('writing_date_lte')?.getRawValue());
    const ordering: string | null = this.filterForm.get('direction')?.getRawValue() + 
    this.filterForm.get('filterType')?.getRawValue();
    
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
  }
}
