import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
//FIREBASE
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import {HttpClientModule} from '@angular/common/http';

//component
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardClientComponent } from './components/dashboard-client/dashboard-client.component';
import { CrudClienteComponent } from './components/crud-cliente/crud-cliente.component';
import { RecuperarPassComponent } from './components/recuperar-pass/recuperar-pass.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';
import { DetalleCuentaComponent } from './components/detalle-cuenta/detalle-cuenta.component';
import { HistorialCompraComponent } from './components/historial-compra/historial-compra.component';

import { AuthGuard} from './guard/roles.guard';
import { SesionGuard} from './guard/sesion.guard';


// Toastr, para notificaciones en angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TablaFilterPipe } from './pipes/tabla-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardAdminComponent,
    DashboardClientComponent,
    CrudClienteComponent,
    DetalleCuentaComponent,
    HistorialCompraComponent,
    RecuperarPassComponent,
    CrudUsuarioComponent,
    TablaFilterPipe
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, SesionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
