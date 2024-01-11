import { Component } from '@angular/core';
import { BookService } from './core/book.service';
import { IBOOK } from './core/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'bookstore-initial';
  public books!: IBOOK[];

  constructor(private _bookService: BookService) {}

  public ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this._bookService.getBooks()
      .subscribe((response: {[s: string]: unknown, result: IBOOK[]}) => {
        this.books = response.result;
        console.log(this.books);
      });
  }
}
