import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AngularMaterialModule
  ]
})
export class AuthModule {
}
