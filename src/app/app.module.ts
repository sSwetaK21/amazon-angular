import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/material.module';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CardsComponent } from './pages/dashboard/components/cards/cards.component';
import { UsersComponent } from './pages/dashboard/components/users/users.component';
import { LayoutComponent } from './pages/dashboard/components/layout/layout.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { ProductCardComponent } from './pages/products/components/product-card/product-card.component';
import { ProductDetailsComponent } from './pages/products/components/product-details/product-details.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductUpdateComponent } from './pages/product-list/product-update/product-update/product-update.component';
import { ConfirmDelComponent } from './components/confirm-del/confirm-del.component';
import { AllComponent } from './pages/all/all.component';
import { SlideComponent } from './pages/all/components/slide/slide.component';
import { SearchComponent } from './pages/search/search.component';
import { CartComponent } from './pages/cart/cart.component';
import { ChartComponent } from './pages/chart/chart.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';
import { DoughnutComponent } from './pages/dashboard/components/doughnut/doughnut.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    CarouselComponent,
    DashboardComponent,
    CardsComponent,
    UsersComponent,
    LayoutComponent,
    AddProductsComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProductUpdateComponent,
    ConfirmDelComponent,
    AllComponent,
    SlideComponent,
    SearchComponent,
    CartComponent,
    ChartComponent,
    OrdersListComponent,
    CheckoutComponent,
    ThankyouComponent,
    DoughnutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
