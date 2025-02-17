import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AuthorsComponent } from './authors.component';
import { AuthorsListComponent } from './authors-list/authors-list.component';
import { FullnamePipe } from '../../core/pipes/fullname.pipe';
import { AuthorsRoutingModule } from './authors-routing.module';


@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorsListComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatPaginatorModule,
    FullnamePipe,
    AuthorsRoutingModule,
  ],
})
export class AuthorsModule { }
