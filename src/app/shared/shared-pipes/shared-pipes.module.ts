import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliceSentencePipe } from './slice-sentence/slice-sentence.pipe';

@NgModule({
  declarations: [
    SliceSentencePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SliceSentencePipe,
  ],
})
export class SharedPipesModule { }
