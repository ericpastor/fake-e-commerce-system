import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authProfileGuard } from './guards/auth-profile.guard';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authProfileGuard],
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
