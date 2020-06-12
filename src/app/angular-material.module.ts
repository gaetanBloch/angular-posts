import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    MatInputModule,
    MatCardModule
  ],
  exports: [
    MatInputModule,
    MatCardModule
  ]
})
export class AngularMaterialModule {
}
