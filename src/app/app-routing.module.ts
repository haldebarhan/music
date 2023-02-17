import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'post', component: CreatePostComponent},
  { path: 'register', loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
