import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//component
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardClientComponent } from './components/dashboard-client/dashboard-client.component';
import { CrudClienteComponent } from './components/crud-cliente/crud-cliente.component';
import { DetalleCuentaComponent } from './components/detalle-cuenta/detalle-cuenta.component';
import { HistorialCompraComponent } from './components/historial-compra/historial-compra.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';

//guard
import { AuthGuard} from './guard/roles.guard';
import { SesionGuard} from './guard/sesion.guard';
import { ClientGuard} from './guard/client.guard';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [SesionGuard] },
  { path: 'sign-up', component: SignUpComponent , canActivate: [SesionGuard]},
  { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-client', component: DashboardClientComponent, canActivate: [ClientGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'crud-cliente', component: CrudClienteComponent, canActivate: [AuthGuard] },
  { path: 'detalle-cuenta', component: DetalleCuentaComponent },
  { path: 'crud-usuario', component: CrudUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'historial-compra', component: HistorialCompraComponent, canActivate: [ClientGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
