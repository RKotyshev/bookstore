import { Component, Input } from '@angular/core';
import { IBook } from '../../../core/services/book-service/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
})
export class BooksListComponent {
  @Input() public booksList!: IBook[];
}
