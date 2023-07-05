import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';







@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,

  ],

  imports: [
    CommonModule,
    RouterModule,

    FormsModule,
    ReactiveFormsModule , 

  ]
})
export class LayoutsModule { }
