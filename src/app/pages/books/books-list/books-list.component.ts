import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IBook } from '../../../core/interfaces/book';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListComponent {
  @Input()
  public booksList!: IBook[] | null;
}
