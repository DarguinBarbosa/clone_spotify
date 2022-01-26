import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'login',
    component: AuthPageComponent,
  },
  {
    path:'**',
    redirectTo:'/auth/login' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
