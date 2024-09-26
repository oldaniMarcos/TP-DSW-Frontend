import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component.js';
import { AppComponent } from './app.component.js';
import { HomeComponent } from './components/home/home.component.js';

export const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'page-not-found', component: PageNotFoundComponent },

  // Wildcard route, selecciona esta ruta si el URL no coincide con ningun path
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' }

];
