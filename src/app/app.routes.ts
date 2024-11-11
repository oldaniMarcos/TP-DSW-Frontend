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
import { AtencionesAdminComponent } from './components/atenciones-admin/atenciones-admin.component.js';
import { ClientesComponent } from './components/clientes/clientes.component.js';
import { EspeciesComponent } from './components/especies/especies.component.js';
import { InsumosComponent } from './components/insumos/insumos.component.js';
import { VeterinariosComponent } from './components/veterinarios/veterinarios.component.js';
import { RazasComponent } from './components/razas/razas.component.js';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'profile', component: ProfileComponent },

  { path: 'mascotas', component: MascotasComponent },

  { path: 'atenciones', component: AtencionesComponent },

  { path: 'login', component: LoginComponent },

  // RUTAS DE ADMIN

  { path: 'admin', component: AdminComponent },

  { path: 'registrar-atencion', component: RegistrarAtencionComponent },

  { path: 'gestion', component: GestionComponent },

  { path: 'atenciones-admin', component: AtencionesAdminComponent },

  { path: 'clientes', component: ClientesComponent },

  { path: 'especies', component: EspeciesComponent },

  { path: 'razas', component: RazasComponent },

  { path: 'insumos', component: InsumosComponent },

  { path: 'veterinarios', component: VeterinariosComponent },

  { path: 'listados', component: ListadosComponent },

  { path: 'page-not-found', component: PageNotFoundComponent },

  // Wildcard route, selecciona esta ruta si el URL no coincide con ningun path
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
];
