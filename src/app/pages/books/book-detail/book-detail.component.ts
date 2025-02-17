import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, filter, forkJoin, map, shareReplay, switchMap } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailComponent {
  public showAuthorDetails: boolean = false;

  public book$: Observable<IBook> = this._route.paramMap.pipe(
    switchMap((paramMap: ParamMap) => this._booksService.getCurrentBook(paramMap.get('id')!)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  public authors$: Observable<IAuthor[]> = this.book$.pipe(
    map((book: IBook) => book.author.map((id: number) => this._authorService.getCurrentAuthor(id))),
    filter((authorReqs: Observable<IAuthor>[]) => authorReqs.length > 0),
    switchMap((authorReqs: Observable<IAuthor>[]) => {

      return forkJoin(authorReqs);
    }),
  );
  public genres$: Observable<IGenre[]> = this.book$.pipe(
    map((book: IBook) => book.genres.map((id: number) => this._genreService.getGenre(id))),
    filter((genreReqs: Observable<IGenre>[]) => genreReqs.length > 0),
    switchMap((genreReqs: Observable<IGenre>[]) => {

      return forkJoin(genreReqs);
    }),
  );

  constructor(
    private _route: ActivatedRoute,
    private _booksService: BooksService,
    private _authorService: AuthorsService,
    private _genreService: GenresService,
  ) { }

  public getAuthorFields(author: IAuthor): string[] {
    const identifierField = `Identifier: #${author.id}`;
    const firstNameField = `First name: ${author.firstName}`;
    const secondNameField = `Second Name: ${author.secondName}`;

    return [identifierField, firstNameField, secondNameField];
  }
}
