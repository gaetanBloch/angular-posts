import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./posts/posts.module')
      .then(module => module.PostsModule)
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module')
      .then(module => module.AuthModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
