import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { BooksService } from '../../core/services/books.service';
import { IBook } from '../../core/interfaces/book';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  public currentCartItems: IBook[] = [];
  private _temporaryItemsCount = 5;
  private _destroyed = new Subject<void>();
  
  constructor(private _bookService: BooksService) {}

  public ngOnInit() {
    this._getCartItems(1, this._temporaryItemsCount);
  }

  public ngOnDestroy():void {
    this._destroyed.next();
    this._destroyed.complete();
  }
  
  private _getCartItems(pageIndex: number, pageSize: number) {
    this._bookService.getPaginatedBooks(pageIndex, pageSize)
      .pipe(takeUntil(this._destroyed))
      .subscribe((books: IBook[]) => this.currentCartItems = books);
  }
}
