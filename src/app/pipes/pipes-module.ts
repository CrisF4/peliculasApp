import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image-pipe';
import { ParesPipe } from './pares-pipe';

@NgModule({
  declarations: [
    ImagePipe,
    ParesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagePipe,
    ParesPipe
  ]
})
export class PipesModule { }
