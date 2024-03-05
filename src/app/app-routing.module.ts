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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'layout', pathMatch: 'full' },
      { path: 'layout', component: LayoutComponent },
      { path: 'users', component: UsersComponent },
      { path: 'customers', component: UsersComponent },
      { path: 'orders', component: UsersComponent },
      { path: 'addproduct', component: AddProductsComponent },

      { path: 'stats', component: UsersComponent },
    ],
  },
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
