import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ProfileComponent } from './profile/profile.component';
import { BillItemComponent } from './bill-item/bill-item.component';
import { BillPageComponent } from './bills/bill-page/bill-page.component';
import { MeteoComponent } from './bills/meteo/meteo.component';
import { ExpenseItemComponent } from './bills/expense-item/expense-item.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotificationPanelComponent,
    NotificationItemComponent,
    HomePageComponent,
    CreateBillComponent,
    AddContactComponent,
    ProfileComponent,
    BillItemComponent,
    BillPageComponent,
    MeteoComponent,
    ExpenseItemComponent,
    RegisterLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
