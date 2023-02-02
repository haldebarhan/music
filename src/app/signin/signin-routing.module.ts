import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmateurComponent } from '../components/amateur/amateur.component';
import { ProComponent } from '../components/pro/pro.component';
import { SigninComponent } from './signin.component';

const routes: Routes = [{
  path: '', component: SigninComponent,
  children: [
    {
      path: '', component: ProComponent
    },
    {
      path: 'amateur', component: AmateurComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninRoutingModule { }
