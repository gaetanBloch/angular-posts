import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class AngularMaterialModule {
}
