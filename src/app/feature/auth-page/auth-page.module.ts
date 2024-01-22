import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AuthPageComponent,
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
    AuthPageComponent,
  ],
})
export class AuthPageModule { }
