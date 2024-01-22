import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../../core/services/book-service/book.service';
import { IBook } from '../../core/services/book-service/book';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit, OnDestroy {
  public currentCartItems: IBook[] = [];
  private _temporaryItemsCount = 5;
  private _destroyed = new Subject<void>();
  
  constructor(private _bookService: BookService) {}

  public ngOnInit() {
    this._getCartItems(1, this._temporaryItemsCount);
  }

  public ngOnDestroy():void {
    this._destroyed.next();
    this._destroyed.complete();
  }
  
  private _getCartItems(pageIndex: number, pageSize: number) {
    this._bookService.getPaginationBooks(pageIndex, pageSize)
      .pipe(takeUntil(this._destroyed))
      .subscribe((books: IBook[]) => this.currentCartItems = books);
  }
}
