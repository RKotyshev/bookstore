import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsPageComponent } from './authors-page.component';
import { AuthorsListComponent } from './authors-list/authors-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedPipesModule } from '../../shared/shared-pipes/shared-pipes.module';

@NgModule({
  declarations: [
    AuthorsPageComponent,
    AuthorsListComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatPaginatorModule,
    SharedPipesModule,
  ],
  exports: [
    AuthorsPageComponent,
  ],
})
export class AuthorsPageModule { }
