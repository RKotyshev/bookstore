import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { EventsComponent } from './events/events.component';
import { TopicsComponent } from './topics/topics.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoveltiesComponent } from './novelties/novelties.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    MainPageComponent,
    EventsComponent,
    TopicsComponent,
    NoveltiesComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
  ],
  exports: [
    MainPageComponent,
  ],
})
export class MainPageModule { }
