import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, forkJoin, map, of, switchMap } from 'rxjs';

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

}
