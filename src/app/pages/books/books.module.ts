import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';


import { BooksComponent } from './books.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { FullnamePipe } from '../../core/pipes/fullname.pipe';
import { BookCreateComponent } from './book-create/book-create.component';


@NgModule({
  declarations: [
    BooksComponent,
    BooksListComponent,
    BookDetailComponent,
    BookCreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    // MatNativeDateModule,
    MatMomentDateModule,
    FullnamePipe,
  ],
  providers: [
    // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD',
        },
        display: {
          dateInput: 'LL',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
  exports: [BooksComponent],
})
export class BooksModule { }
