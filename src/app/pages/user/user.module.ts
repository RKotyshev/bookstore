import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    UserRoutingModule,
  ],
})
export class UserModule { }
