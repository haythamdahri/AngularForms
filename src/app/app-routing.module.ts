import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {ReactiveFormsComponent} from './reactive-forms/reactive-forms.component';
import {FormsComponent} from './forms/forms.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'form', component: FormsComponent},
  {path: 'reactive-form', component: ReactiveFormsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
