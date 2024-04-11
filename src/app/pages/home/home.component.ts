import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductsComponent } from '../products/products.component';
import { NewestProductComponent } from '../../components/newest-product/newest-product.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { LatestProductsComponent } from '../../components/latest-products/latest-products.component';
import { PlaceholderNewestProductComponent } from '../../placeholders/placeholder-newest-product/placeholder-newest-product.component';
import { PlaceholderSlidesComponent } from '../../placeholders/placeholder-slides/placeholder-slides.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    NavbarComponent,
    ProductsComponent,
    NewestProductComponent,
    CategoriesComponent,
    LatestProductsComponent,
    PlaceholderNewestProductComponent,
    PlaceholderSlidesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
