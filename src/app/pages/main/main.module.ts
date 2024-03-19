import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { MainPageComponent } from './main.component';
import { EventsComponent } from './events/events.component';
import { TopicsComponent } from './topics/topics.component';
import { NoveltiesComponent } from './novelties/novelties.component';
import { SliceSentencePipe } from '../../core/pipes/slice-sentence.pipe';

const firebaseConfig = {
  apiKey: 'AIzaSyCSBvSuMIkbWWfkUDqosGCeEwZCC9Kv2rA',
  authDomain: 'bookstore-b00f2.firebaseapp.com',
  projectId: 'bookstore-b00f2',
  storageBucket: 'bookstore-b00f2.appspot.com',
  messagingSenderId: '1041034619430',
  appId: '1:1041034619430:web:ac6fbfbd52379ea1c114e7',
  measurementId: 'G-FRNCQGG8H8',
};

@NgModule({
  declarations: [
    MainPageComponent,
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
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),
  ],
  exports: [
    MainPageComponent,
  ],
})
export class MainPageModule { }
