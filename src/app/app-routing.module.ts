import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClockComponent} from './clock/clock.component';


const routes: Routes = [
  {path: '', component: ClockComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
