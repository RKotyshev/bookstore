import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';

import { MainComponent } from './main.component';
import { EventsComponent } from './events/events.component';
import { TopicsComponent } from './topics/topics.component';
import { NoveltiesComponent } from './novelties/novelties.component';
import { SliceSentencePipe } from '../../core/pipes/slice-sentence.pipe';


@NgModule({
  declarations: [
    MainComponent,
    EventsComponent,
    TopicsComponent,
    NoveltiesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
    SliceSentencePipe,
  ],
})
export class MainModule { }
