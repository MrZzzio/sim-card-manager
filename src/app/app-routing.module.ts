import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardNewComponent } from './card-new/card-new.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const pref = "api/";

const routes: Routes = [
  { path: pref + 'cards', component: CardComponent },
  { path: pref + 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: pref + 'dashboard', pathMatch: 'full' },
  { path: pref + 'cards/:id', component: CardDetailComponent },
  { path: pref + 'new', component: CardNewComponent },
  { path: pref + 'login', component: LoginComponent },
  { path: pref + 'register', component: RegisterComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
