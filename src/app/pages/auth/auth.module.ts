import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthComponent } from './auth.component';
import { AuthFormComponent } from './auth-form/auth-form.component';


@NgModule({
  declarations: [
    AuthComponent,
    AuthFormComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    AuthComponent,
  ],
})
export class AuthPageModule { }
