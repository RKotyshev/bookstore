import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliceSentencePipe } from './slice-sentence/slice-sentence.pipe';
import { FullnamePipe } from './fullname/fullname.pipe';

@NgModule({
  declarations: [
    SliceSentencePipe,
    FullnamePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SliceSentencePipe,
    FullnamePipe,
  ],
})
export class SharedPipesModule { }
