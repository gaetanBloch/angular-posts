import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./posts/posts.module')
      .then(module => module.PostsModule)
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module')
      .then(module => module.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
