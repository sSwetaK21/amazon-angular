import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './pages/header/header.component';
import { UsersComponent } from './pages/dashboard/components/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { LayoutComponent } from './pages/dashboard/components/layout/layout.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { AllComponent } from './pages/all/all.component';
import { ProductDetailsComponent } from './pages/products/components/product-details/product-details.component';
import { ProductCardComponent } from './pages/products/components/product-card/product-card.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'all', component: AllComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'productCard',
    component: ProductCardComponent,
  },
  {
    path: 'productCard/:id',
    component: ProductDetailsComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'layout', pathMatch: 'full' },
      { path: 'layout', component: LayoutComponent },
      { path: 'users', component: UsersComponent },
      { path: 'orders', component: UsersComponent },
      { path: 'addproduct', component: AddProductsComponent },
      { path: 'productlist', component: ProductListComponent },
      { path: 'stats', component: UsersComponent },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
