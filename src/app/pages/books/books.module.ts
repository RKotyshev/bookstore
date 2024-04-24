import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BooksComponent } from './books.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { DisplayTimerComponent } from '../../core/components/display-timer/display-timer.component';
import { ModalDetailsComponent } from '../../core/components/modal-details/modal-details.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BooksFilterComponent } from './books-filter/books-filter.component';
import { InputFileComponent } from '../../core/components/input-file/input-file.component';
import { FullnamePipe } from '../../core/pipes/fullname.pipe';
import { FileTypesPipe } from '../../core/pipes/file-types.pipe';
import { BooksRoutingModule } from './books-routing.module';


@NgModule({
  declarations: [
    BooksComponent,
    BooksListComponent,
    BookDetailComponent,
    BookCreateComponent,
    BooksFilterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    BooksRoutingModule,
    DisplayTimerComponent,
    ModalDetailsComponent,
    InputFileComponent,
    FullnamePipe,
    FileTypesPipe,
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD',
        },
        display: {
          dateInput: 'YYYY-MM-DD',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class BooksModule { }
