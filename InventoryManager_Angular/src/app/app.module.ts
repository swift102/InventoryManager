import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { DashboardComponent } from './product/dashboard/dashboard.component';
import { ProductlistComponent } from './product/productlist/productlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';


import { MatAccordion } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddProductComponent,
    DashboardComponent,
    ProductlistComponent,
    NotificationComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule ,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
