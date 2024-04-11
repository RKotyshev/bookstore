import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, map, takeUntil } from 'rxjs';

import { BooksService } from '../../core/services/books.service';
import { IBook, IRequestBook } from '../../core/interfaces/book';
import { IResponse } from '../../core/interfaces/response';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  public currentCartItems: IBook[] = [];
  private _temporaryItemsCount = 5;
  private _destroyed = new Subject<void>();

  constructor(private _bookService: BooksService) { }

  public ngOnInit(): void {
    this._getCartItems(1, this._temporaryItemsCount);
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private _getCartItems(pageIndex: number, pageSize: number): void {
    const params: IRequestBook = {
      page: pageIndex + 1,
      page_size: pageSize,
    };
    this._bookService.getBooks(params).pipe(
      map((response: IResponse<IBook>) => response.result),
      takeUntil(this._destroyed),
    )
      .subscribe((books: IBook[]) => this.currentCartItems = books);
  }
}
