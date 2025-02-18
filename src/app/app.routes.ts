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
import { AtencionesAdminComponent } from './components/atenciones-admin/atenciones-admin.component.js';
import { ClientesComponent } from './components/clientes/clientes.component.js';
import { EspeciesComponent } from './components/especies/especies.component.js';
import { InsumosComponent } from './components/insumos/insumos.component.js';
import { VeterinariosComponent } from './components/veterinarios/veterinarios.component.js';
import { RazasComponent } from './components/razas/razas.component.js';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component.js';
import { RolGuard } from './guards/rol.guard.js';
import { TiposInsumosComponent } from './components/tipos-insumos/tipos-insumos.component.js';

export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  // RUTAS DE CLIENTE

  { path: 'home', component: HomeComponent, canActivate: [RolGuard], data: {rol: 'cliente'} },

  { path: 'mascotas', component: MascotasComponent, canActivate: [RolGuard], data: {rol: 'cliente'} },

  { path: 'atenciones', component: AtencionesComponent, canActivate: [RolGuard], data: {rol: 'cliente'} },

  // RUTAS DE ADMIN

  { path: 'admin', component: AdminComponent, canActivate: [RolGuard], data: {rol: 'admin'} },

  { path: 'registrar-atencion', component: RegistrarAtencionComponent, canActivate: [RolGuard], data: {rol: 'admin'} },

  { path: 'gestion', component: GestionComponent, canActivate: [RolGuard], data: {rol: 'admin'} },

  { path: 'atenciones-admin', component: AtencionesAdminComponent, canActivate: [RolGuard], data: {rol: 'admin'} },

  { path: 'clientes', component: ClientesComponent, canActivate: [RolGuard], data: {rol: 'admin'} },

  { path: 'especies', component: EspeciesComponent, canActivate: [RolGuard], data: {rol: 'admin'} },

  { path: 'razas', component: RazasComponent, canActivate: [RolGuard], data: {rol: 'admin'} },

  { path: 'insumos', component: InsumosComponent, canActivate: [RolGuard], data: {rol: 'admin'} },

  { path: 'tipos-insumos', component: TiposInsumosComponent, canActivate: [RolGuard], data: {rol: 'admin'} },

  { path: 'veterinarios', component: VeterinariosComponent, canActivate: [RolGuard], data: {rol: 'admin'} },

  { path: 'listados', component: ListadosComponent, canActivate: [RolGuard], data: {rol: 'admin'} },

  // Errores

  { path: 'page-not-found', component: PageNotFoundComponent },

  { path: 'not-authorized', component: NotAuthorizedComponent },

  // Wildcard route, selecciona esta ruta si el URL no coincide con ningun path
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
];
