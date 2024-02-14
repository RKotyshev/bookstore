import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, Subject, forkJoin, map, of, shareReplay, switchMap, takeUntil } from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { IBook } from '../../../core/interfaces/book';
import { IAuthor } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit, OnDestroy {
  // public book!: IBook;
  // public authors: IAuthor[] = [];
  // public genres: IGenre[] = [];
  public book$: Observable<IBook> = this._route.paramMap.pipe(
    switchMap((paramMap: ParamMap) => this._booksService.getBook(paramMap.get('id')!)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  public authors$: Observable<IAuthor[]> = this.book$.pipe(
    map((book: IBook) => book.author.map((id: number) => this._authorService.getAuthor(id))),
    switchMap((authorReqs: Observable<IAuthor>[]) => {
      return authorReqs.length ? forkJoin(authorReqs) : of([]);
    }),
  );
  public genres$: Observable<IGenre[]> = this.book$.pipe(
    map((book: IBook) => book.genres.map((id: number) => this._genreService.getGenre(id))),
    switchMap((genreReqs: Observable<IGenre>[]) => {
      return genreReqs.length ? forkJoin(genreReqs) : of([]);
    }),
  );

  // private _destroyed = new Subject<void>();
  
  constructor(
    private _route: ActivatedRoute,
    private _booksService: BooksService,
    private _authorService: AuthorsService,
    private _genreService: GenresService,
  ) { }

  public ngOnInit(): void {
    // this.getBook();
    // this.getAuthors();
    // this.getGenres();
  }

  public ngOnDestroy(): void {
    // this._destroyed.next();
    // this._destroyed.complete();
  }
  
  // public getBook(): void {
  //   this.book$.pipe(
  //     takeUntil(this._destroyed),
  //   )
  //     .subscribe((book: IBook) => {
  //       this.book = book;
  //     });
  // }

  // public getAuthors(): void {
  //   this.book$.pipe(
  //     map((book: IBook) => book.author.map((id: number) => this._authorService.getAuthor(id))),
  //     switchMap((authorReqs: Observable<IAuthor>[]) => {
  //       return authorReqs.length ? forkJoin(authorReqs) : of(null);
  //     }),
  //     takeUntil(this._destroyed),
  //   ).subscribe((authors: IAuthor[] | null) => {
  //     this.authors = authors ? authors : [];
  //   });
  // }

  // public getGenres(): void {
  //   this.book$.pipe(
  //     map((book: IBook) => book.genres.map((id: number) => this._genreService.getGenre(id))),
  //     switchMap((genreReqs: Observable<IGenre>[]) => {
  //       return genreReqs.length ? forkJoin(genreReqs) : of(null);
  //     }),
  //     takeUntil(this._destroyed),
  //   ).subscribe((genres: IGenre[] | null) => {
  //     this.genres = genres ? genres : [];
  //   });
  // }

}
