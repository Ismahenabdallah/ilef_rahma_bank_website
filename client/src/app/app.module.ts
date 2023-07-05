import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutsModule } from './layouts/layouts.module';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/HomeInetrface/HomeInetrface.component';
import { PagesLoginComponent } from './components/pages-login/pages-login.component';
import { PagesRegisterComponent } from './components/pages-register/pages-register.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedMessengerModule } from './shared-messenger/shared-messenger.module';
import { HelpSupportComponent } from './chatbot/components/help-support/help-support.component';

@NgModule({
  declarations: [
    HelpSupportComponent,
    AppComponent,

    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    PagesLoginComponent,
    PagesRegisterComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    LayoutsModule,
    SharedMessengerModule,
    ToastrModule.forRoot(),




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
