import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormViewComponent } from './form-view/form-view.component';
import { DayViewComponent } from './day-view/day-view.component';

const routes: Routes = [
  {path: 'day', component: DayViewComponent},
  {path: 'form', component: FormViewComponent},
  {path: '', redirectTo: 'day', pathMatch: 'full' },
  {path: '**', redirectTo: '/day' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
