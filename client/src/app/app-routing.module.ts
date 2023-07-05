import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PagesLoginComponent } from './components/pages-login/pages-login.component';
import { PagesRegisterComponent } from './components/pages-register/pages-register.component';
import { GuardAuthGuard } from './guards/guard-auth.guard';
import { GuardAdminGuard } from './guards/guard-admin.guard';
import { AdminComponent } from './layouts/admin/admin.component';
import { GuardUserGuard } from './guards/guard-user.guard';
import { UserComponent } from './layouts/user/user.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: "admin", component: AdminComponent, canActivate: [GuardAuthGuard, GuardAdminGuard], children: [
      { path: "", loadChildren: () => import('./views/admin/get-users/get-users.module').then(m => m.GetUsersModule) },
      { path: "dash", loadChildren: () => import('./views/admin/get-users/get-users.module').then(m => m.GetUsersModule) },

      { path: "all", loadChildren: () => import('./views/admin/get-users/get-users.module').then(m => m.GetUsersModule) }
      ,
      { path: "details/:id", loadChildren: () => import('./views/admin/details/details.module').then(m => m.DetailsModule) }


    ]
  }, {
    path: "user", component: UserComponent, canActivate: [GuardAuthGuard, GuardUserGuard], children: [
      // { path: "", component: UserComponent},
      { path: "account", loadChildren: () => import('./views/user/profil/profil.module').then(m => m.ProfilModule) },

    ]
  },



  { path: "", component: HomeComponent },
  { path: "login", component: PagesLoginComponent },
  { path: "register", component: PagesRegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
