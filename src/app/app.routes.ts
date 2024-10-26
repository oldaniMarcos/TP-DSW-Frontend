import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component.js';
import { HomeComponent } from './components/home/home.component.js';
import { LoginComponent } from './components/login/login.component.js';
import { MascotasComponent } from './components/mascotas/mascotas.component.js';
import { AtencionesComponent } from './components/atenciones/atenciones.component.js';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  { path: 'mascotas', component: MascotasComponent },

  { path: 'atenciones', component: AtencionesComponent },

  { path: 'login', component: LoginComponent },

  { path: 'mascotas', component: MascotasComponent },

  { path: 'page-not-found', component: PageNotFoundComponent },

  // Wildcard route, selecciona esta ruta si el URL no coincide con ningun path
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
];
