import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { AtencionesComponent } from './components/atenciones/atenciones.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegistrarAtencionComponent } from './components/registrar-atencion/registrar-atencion.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { ListadosComponent } from './components/listados/listados.component';
import { AtencionesAdminComponent } from './components/atenciones-admin/atenciones-admin.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EspeciesComponent } from './components/especies/especies.component';
import { InsumosComponent } from './components/insumos/insumos.component';
import { VeterinariosComponent } from './components/veterinarios/veterinarios.component';
import { RazasComponent } from './components/razas/razas.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { RolGuard } from './guards/rol.guard';
import { TiposInsumosComponent } from './components/tipos-insumos/tipos-insumos.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { ClientesMascotasComponent } from './components/clientes-mascotas/clientes-mascotas.component';

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

  { path: 'ingresos', component: IngresosComponent, canActivate: [RolGuard], data: {rol: 'admin'} },

  { path: 'clientes-mascotas', component: ClientesMascotasComponent, canActivate: [RolGuard], data: {rol: 'admin'} },

  // Errores

  { path: 'page-not-found', component: PageNotFoundComponent },

  { path: 'not-authorized', component: NotAuthorizedComponent },

  // Wildcard route, selecciona esta ruta si el URL no coincide con ningun path
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
];
