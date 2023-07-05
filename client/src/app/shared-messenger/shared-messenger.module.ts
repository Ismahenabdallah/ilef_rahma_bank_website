import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../components/search.pipe';


// ng g m shared-messenger

@NgModule({
  declarations: [
    // Déclarations de composants, directives, etc.
    SearchPipe
  ],
  imports: [
    CommonModule,
    // Autres modules utilisés par SharedMessengerModule
  ],
  exports: [
    // Composants, directives, etc. à exporter
    SearchPipe
  ]
})
export class SharedMessengerModule { }
