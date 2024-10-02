import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component.js';
import { HomeComponent } from './components/home/home.component.js';
import { LoginComponent } from './components/login/login.component.js';
import { MenuClientesComponent } from './components/menu-clientes/menu-clientes.component.js';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'menu-clientes', component: MenuClientesComponent },

  { path: 'login', component: LoginComponent },

  { path: 'page-not-found', component: PageNotFoundComponent },
  // Wildcard route, selecciona esta ruta si el URL no coincide con ningun path
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
];
