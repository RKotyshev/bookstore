import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { EMPTY, Observable, combineLatest, forkJoin, isObservable, map, of, switchMap } from 'rxjs';

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
  public authors!: IAuthor[];
  public genres!: IGenre[];

  constructor(
    private _route: ActivatedRoute,
    private _booksService: BooksService,
    private _authorService: AuthorsService,
    private _genreService: GenresService,
  ) { }

  public ngOnInit(): void {
    this.getData();
  }

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
          { book: IBook, authors: Observable<IAuthor>[], genres: Observable<IGenre>[]},
      ) => {
        const requests: {
          book: Observable<IBook>
          authors?: Observable<IAuthor[]>,
          genres?: Observable<IGenre[]>,
        } = {
          book: of(book),
        };

        if (authors.length) {
          requests.authors = forkJoin(authors);
        }

        if (genres.length) {
          requests.genres = forkJoin(genres);
        }


        return forkJoin(requests);
      }),
    ).subscribe((
      { book, authors, genres }: { book: IBook, authors?: IAuthor[], genres?: IGenre[] },
    ) => {
      console.log(book);
      this.book = book;
      this.authors = authors ? authors : [];
      
      this.genres = genres ? genres : [];
      
    });
  }

  // public getData(): void {
  //   this._route.paramMap.pipe(
  //     switchMap((paramMap: ParamMap) => this._booksService.getBook(paramMap.get('id')!)),
  //     map((book: IBook) => {

  //       const authors = book.author.map((author: number) => this._authorService.getAuthor(author));
  //       const genres = book.genres.map((genre: number) => this._genreService.getGenre(genre));
        

  //       return {
  //         book,
  //         authors,
  //         genres,
  //       };
  //     }),
  //     switchMap((
  //       { book, authors, genres }:
  //         { book: IBook, authors: Observable<IAuthor>[], genres: Observable<IGenre>[] },
  //     ) => {

  //       return combineLatest({
  //         book: of(book),
  //         authors: forkJoin(authors),
  //         genres: forkJoin(genres),
  //       });
  //     }),
  //   ).subscribe((
  //     { book, authors, genres }: { book: IBook, authors: IAuthor[], genres: IGenre[] },
  //   ) => {
  //     console.log(book);
  //     this.book = book;
  //     this.authors = authors;
  //     this.genres = genres;
  //   });
  // }

}
