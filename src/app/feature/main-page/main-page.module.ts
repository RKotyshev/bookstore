import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { EventsComponent } from './events/events.component';
import { TopicsComponent } from './topics/topics.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MainPageComponent,
    EventsComponent,
    TopicsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    MainPageComponent,
  ],
})
export class MainPageModule { }
