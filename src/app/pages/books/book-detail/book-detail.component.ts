import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, combineLatest, forkJoin, from, map, mergeMap, of, switchMap, tap } from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import { IBook } from '../../../core/interfaces/book';
import { AuthorsService } from '../../../core/services/authors.service';
import { IAuthor } from '../../../core/interfaces/author';
import { IGenre } from '../../../core/interfaces/genre';
import { GenresService } from '../../../core/services/genres.service';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  public book!: IBook;
  public authors: IAuthor[] = [];
  public genres: IGenre[] = [];
  
  constructor(
    private _route: ActivatedRoute,
    private _booksService: BooksService,
    private _authorService: AuthorsService,
    private _genreService: GenresService,
  ) {}
  
  public ngOnInit(): void {
    this.getData();
  }

  // public getData(): void {
  //   this._route.paramMap.pipe(
  //     switchMap((paramMap: ParamMap) => this._booksService.getBook(paramMap.get('id')!)),
  //     tap((book: IBook) => this.book = book),
  //     map((book: IBook) => book.author),
  //     switchMap((authors: number[]) => from(authors)),
  //     mergeMap((authorId: number) => this._authorService.getAuthor(authorId)),
  //     tap((author: IAuthor) => this.authors.push(author)),
  //   ).subscribe();
  // }

  // public getData(): void {
  //   this._route.paramMap.pipe(
  //     switchMap((paramMap: ParamMap) => this._booksService.getBook(paramMap.get('id')!)),
  //     tap((book: IBook) => this.book = book),
  //     switchMap((book: IBook) => forkJoin({
  //       authors: from(book.author),
  //       genres: from(book.genres),
  //     })),
  //     switchMap(({ authors, genres }: { authors: number, genres: number }) => forkJoin({
  //       authorRes: this._authorService.getAuthor(authors),
  //       genreRes: this._genreService.getGenre(genres),
  //     })),
  //     tap(({ authorRes, genreRes }: { authorRes: IAuthor, genreRes: IGenre }) => {
  //       this.authors.push(authorRes);
  //       this.genres.push(genreRes);
  //     }),
  //   ).subscribe();
  // }

  // Work:

  // public getData(): void {
  //   this._route.paramMap.pipe(
  //     switchMap((paramMap: ParamMap) => this._booksService.getBook(paramMap.get('id')!)),
  //     tap((book: IBook) => this.book = book),
  //     switchMap((book: IBook) => forkJoin({
  //       authors: of(book.author),
  //       genres: of(book.genres),
  //     })),
  //     switchMap(({ authors, genres }: { authors: number[], genres: number[] }) => {
  //       return forkJoin([of(authors), ...this._genreService.getGenre(genres)]);
  //     }),
  //     tap(([authors, ...genresResponse]: [authors: number[], ...genresResponse: IGenre[]]) => {
  //       this.genres.push(...genresResponse);

  //       return authors;
  //     }),
  //     switchMap(([authors]: [authors: number[], ...genresResponse: IGenre[]]) => {
  //       return forkJoin(this._authorService.getAuthor(authors));
  //     }),
  //     tap((authorsResponse: IAuthor[]) => this.authors.push(...authorsResponse)),
  //   ).subscribe();
  // }

  // public getData(): void {
  //   this._route.paramMap.pipe(
  //     switchMap((paramMap: ParamMap) => this._booksService.getBook(paramMap.get('id')!)),
  //     tap((book: IBook) => this.book = book),
  //     map((book: IBook) => {
  //       return {
  //         authors: book.author,
  //         genres: this._genreService.getGenre(book.genres),
  //       };
  //     }),
  //     switchMap(({ authors, genres }: { authors: number[], genres: Observable<IGenre>[] }) => {
  //       return forkJoin([of(authors), ...genres]);
  //     }),
  //     tap(([authors, ...genresResponse]: [authors: number[], ...genresResponse: IGenre[]]) => {
  //       this.genres.push(...genresResponse);

  //       return authors;
  //     }),
  //     switchMap(([authors]: [authors: number[], ...genresResponse: IGenre[]]) => {
  //       return forkJoin(this._authorService.getAuthor(authors));
  //     }),
  //     tap((authorsResponse: IAuthor[]) => this.authors.push(...authorsResponse)),
  //   ).subscribe();
  // }

  ///////////////////////////////////

  // public getData(): void {
  //   this._route.paramMap.pipe(
  //     switchMap((paramMap: ParamMap) => this._booksService.getBook(paramMap.get('id')!)),
  //     tap((book: IBook) => this.book = book),
  //     map((book: IBook) => {
  //       return {
  //         authors: this._authorService.getAuthor(book.author),
  //         genres: this._genreService.getGenre(book.genres),
  //       };
  //     }),
  //     switchMap((
  //       { authors, genres }: { authors: Observable<IAuthor>[], genres: Observable<IGenre>[] },
  //     ) => {
  //       return forkJoin([of(authors), ...genres]);
  //     }),
  //     tap((
  //       [authors, ...genresResponse]: [authors: Observable<IAuthor>[], ...genresResponse: IGenre[]],
  //     ) => {
  //       this.genres.push(...genresResponse);

  //       return authors;
  //     }),
  //     switchMap(([authors]: [authors: Observable<IAuthor>[], ...genresResponse: IGenre[]]) => {
  //       return forkJoin(authors);
  //     }),
  //     tap((authorsResponse: IAuthor[]) => this.authors.push(...authorsResponse)),
  //   ).subscribe();
  // }

  //////////////////////////////////////////////////

  // public getData(): void {
  //   this._route.paramMap.pipe(
  //     switchMap((paramMap: ParamMap) => this._booksService.getBook(paramMap.get('id')!)),
  //     tap((book: IBook) => this.book = book),
  //     map((book: IBook) => {
  //       return {
  //         authors: this._authorService.getAuthor(book.author),
  //         genres: this._genreService.getGenre(book.genres),
  //       };
  //     }),
  //     switchMap((
  //       { authors, genres }: { authors: Observable<IAuthor>[], genres: Observable<IGenre>[] },
  //     ) => {
  //       // return forkJoin([of(authors), ...genres]);
  //       return forkJoin({
  //         authors: forkJoin([...authors]),
  //         genres: forkJoin([...genres]),
  //       });
  //     }),
  //     tap((
  //       { authors, genres }: {authors: IAuthor[], genres: IGenre[]},
  //     ) => {
  //       // this.genres.push(genres);
  //       console.log(genres);
  //       console.log(authors);

  //       return authors;
  //     }),
  //     // switchMap(([authors]: [authors: Observable<IAuthor>[], ...genresResponse: IGenre[]]) => {
  //     //   return forkJoin(authors);
  //     // }),
  //     // tap((authorsResponse: IAuthor[]) => this.authors.push(...authorsResponse)),
  //   ).subscribe();
  // }

  /////////////////////////////////////////

  public getData(): void {
    this._route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => this._booksService.getBook(paramMap.get('id')!)),
      map((book: IBook) => {
        const authors = book.author.map((author: number) => this._authorService.getAuthor(author));
        const genres = book.genres.map((genre: number) => this._genreService.getGenre(genre));

        return {
          book,
          authors,
          genres,
        };
      }),
      switchMap((
        { book, authors, genres }:
        { book: IBook, authors: Observable<IAuthor>[], genres: Observable<IGenre>[] },
      ) => {
        return forkJoin({
          book: of(book),
          authors: forkJoin(authors),
          genres: forkJoin(genres),
        });
      }),
    ).subscribe((
      { book, authors, genres }: { book: IBook, authors: IAuthor[], genres: IGenre[] },
    ) => {
      this.book = book;
      this.authors = authors;
      this.genres = genres;
    });
  }

  // public getData(): void {
  //   this._route.paramMap.pipe(
  //     switchMap((paramMap: ParamMap) => this._booksService.getBook(paramMap.get('id')!)),
  //     tap((book: IBook) => this.book = book),
  //     switchMap((book: IBook) => forkJoin({
  //       authors: of(book.author),
  //       genres: of(book.genres),
  //     })),
  //     switchMap(({ authors, genres }: { authors: number[], genres: number[] }) => forkJoin({
  //       authorRes: of(authors.map((author: number) => this._authorService.getAuthor(author))),
  //       genreRes: of(genres.map((genre: number) => this._genreService.getGenre(genre))),
  //     })),
  //     tap(({ authorRes, genreRes }: { authorRes: Observable<IAuthor[]>, genreRes: Observable<IGenre[]> }) => {
  //       this.authors.push(authorRes);
  //       this.genres.push(genreRes);
  //     }),
  //   ).subscribe();
  // }

  // public getData(): void {
  //   this._route.paramMap.pipe(
  //     switchMap((paramMap: ParamMap) => this._booksService.getBook(paramMap.get('id')!)),
  //     tap((book: IBook) => this.book = book),
  //     // map((book: IBook) => {
  //     //   return { authors: book.author, genres: book.genres };
  //     // }),

  //     switchMap((book: IBook) => forkJoin({
  //       authors: from(book.author).map,
  //       genres: from(book.genres),
  //     })),
  //     // switchMap(({ authors, genres }: { authors: number, genres: number }) => forkJoin({
  //     //   authorRes: this._authorService.getAuthor(authors),
  //     //   genreRes: this._genreService.getGenre(genres),
  //     // })),
  //     // tap(({ authorRes, genreRes }: { authorRes: IAuthor, genreRes: IGenre }) => {
  //     //   this.authors.push(authorRes);
  //     //   this.genres.push(genreRes);
  //     // }),
  //   ).subscribe();
  // }

  // public getData(): void {
  //   this._route.paramMap.pipe(
  //     switchMap((paramMap: ParamMap) => this._booksService.getBook(paramMap.get('id')!)),
  //     tap((book: IBook) => this.book = book),
  //     switchMap((book: IBook) => combineLatest([from(book.author), from(book.genres)])),
  //     switchMap(([author, genre]: [author: number, genre: number]) => combineLatest(
  //       [this._authorService.getAuthor(author), this._genreService.getGenre(genre)],
  //     )),
  //     tap(([author, genre]: [author: IAuthor, genre: IGenre]) => {
  //       this.authors.push(author);
  //       this.genres.push(genre);
  //     }),
  //   ).subscribe();
  // }
}
