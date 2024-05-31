import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { NotificationPanelComponent } from '../components/notification-panel/notification-panel.component';
import { NotificationItemComponent } from '../components/notification-item/notification-item.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { CreateBillComponent } from '../components/create-bill/create-bill.component';
import { AddContactComponent } from '../components/add-contact/add-contact.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { BillItemComponent } from '../components/bill-item/bill-item.component';
import { BillPageComponent } from '../components/bills/bill-page/bill-page.component';
import { MeteoComponent } from '../components/bills/meteo/meteo.component';
import { ExpenseItemComponent } from '../components/bills/expense-item/expense-item.component';
import { RegisterLoginComponent } from '../components/register-login/register-login.component';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

const components = [
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
]

@NgModule({
  declarations: [ components ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ components ]
})
export class ComponentModule { }
