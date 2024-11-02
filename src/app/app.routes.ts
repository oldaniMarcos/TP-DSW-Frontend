import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component.js';
import { HomeComponent } from './components/home/home.component.js';
import { LoginComponent } from './components/login/login.component.js';
import { MascotasComponent } from './components/mascotas/mascotas.component.js';
import { AtencionesComponent } from './components/atenciones/atenciones.component.js';
import { AdminComponent } from './components/admin/admin.component.js';
import { RegistrarAtencionComponent } from './components/registrar-atencion/registrar-atencion.component.js';
import { GestionComponent } from './components/gestion/gestion.component.js';
import { ListadosComponent } from './components/listados/listados.component.js';
import { ProfileComponent } from './components/profile/profile.component.js';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  { path: 'profile', component: ProfileComponent },

  { path: 'mascotas', component: MascotasComponent },

  { path: 'atenciones', component: AtencionesComponent },

  { path: 'admin', component: AdminComponent },

  { path: 'registrar-atencion', component: RegistrarAtencionComponent },

  { path: 'gestion', component: GestionComponent },

  { path: 'listados', component: ListadosComponent },

  { path: 'login', component: LoginComponent },

  { path: 'mascotas', component: MascotasComponent },

  { path: 'page-not-found', component: PageNotFoundComponent },

  // Wildcard route, selecciona esta ruta si el URL no coincide con ningun path
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
];
