import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { AuthorsService } from '../../../core/services/authors.service';
import { IAuthor } from '../../../core/interfaces/author';
import { Observable, switchMap } from 'rxjs';
import { GenresService } from '../../../core/services/genres.service';
import { IGenre } from '../../../core/interfaces/genre';


@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrl: './books-filter.component.scss',
})
export class BooksFilterComponent implements OnInit {
  public filterForm = this._formBuilder.group({
    title: [''],
    author: [''],
    genre: [''],
    priceGroup: this._formBuilder.group({
      price: [0],
      price_lte: [0],
      price_gte: [0],
    }),
    writingDateGroup: this._formBuilder.group({
      writing_date: [''],
      writing_date_gte: [''],
      writing_date_lte: [''],
    }),
    releaseDateGroup: this._formBuilder.group({
      release_date: [''],
      release_date_gte: [''],
      release_date_lte: [''],
    }),
    ordering: [''],
  });
  public get author(): FormControl {
    return this.filterForm.get('author') as FormControl;
  }
  public authors$!: Observable<IAuthor[]>;
  public genres$!: Observable<IGenre[]>;

  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _authorsService: AuthorsService,
    private _genresService: GenresService,
  ) {}
  
  public ngOnInit(): void {
    this.authors$ = this.author.valueChanges.pipe(
      switchMap((term: string) => this._authorsService.getSuggestedAuthors(term)),
    );
    this.genres$ = this._genresService.getPaginatedGenres(0, 100);
  }
}
