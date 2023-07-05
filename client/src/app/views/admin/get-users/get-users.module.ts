import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetUsersRoutingModule } from './get-users-routing.module';
import { GetUsersComponent } from './get-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMessengerModule } from "../../../shared-messenger/shared-messenger.module";


@NgModule({
    declarations: [GetUsersComponent],
    imports: [
        CommonModule,
        GetUsersRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedMessengerModule
    ]
})
export class GetUsersModule { }
