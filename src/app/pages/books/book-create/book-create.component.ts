import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { Observable, Subject, debounceTime, fromEvent, switchMap, takeUntil } from 'rxjs';

import { IAuthor } from '../../../core/interfaces/author';
import { AuthorsService } from '../../../core/services/authors.service';
import { IBook, INewBook } from '../../../core/interfaces/book';
import { IGenre } from '../../../core/interfaces/genre';
import { GenresService } from '../../../core/services/genres.service';
import { BooksService } from '../../../core/services/books.service';
import moment from 'moment';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss',
})
export class BookCreateComponent implements AfterViewInit, OnDestroy {
  // @ViewChild('authors') public authorInput!: ElementRef<HTMLInputElement>;
  @ViewChild('testFormVariable') public form!: ElementRef<HTMLFormElement>;
  public authors$: Observable<IAuthor[]> = this._authorService.getPaginatedAuthors(0, 100);
  public genres$: Observable<IGenre[]> = this._genresService.getPaginatedGenres(0, 100);
  public newBook: INewBook = {
    in_stock: 0,
    title: '',
    description: '',
    price: 0,
    genres: [],
    author: [],
    release_date: '',
    writing_date: '',
  };
  private _destroyed = new Subject<void>;

  constructor(
    private _authorService: AuthorsService,
    private _genresService: GenresService,
    private _booksService: BooksService,
  ) {}

  public ngAfterViewInit(): void {
    // this.authors$ = fromEvent(this.authorInput.nativeElement, 'input').pipe(
    //   debounceTime(500),
    //   switchMap(() => {
    //     return this._authorService.getSuggestedAuthors(this.authorInput.nativeElement.value);
    //   }),
    //   takeUntil(this._destroyed),
    // );
    console.log(this.form.nativeElement.elements);

  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public displayFn(author: IAuthor): string {
    return `${author.first_name} ${author.second_name}`;
  }

  public onSubmit(book: INewBook): void {
    console.log(book);
    this._booksService.postBook({
      ...book,
      writing_date: moment(book.writing_date).format('YYYY-MM-DD'),
      release_date: moment(book.release_date).format('YYYY-MM-DD'),
    }).subscribe(console.log);
  }
}
