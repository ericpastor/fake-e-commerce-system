import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../models/Product';
import {
  loadAllProducts,
  loadProductsWithPagination,
} from '../../store/Product/Product.Actions';
import {
  getAllProducts,
  getAllProductsWithPagination,
} from '../../store/Product/Product.Selector';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { loadCategories } from '../../store/Category/Category.Actions';
import { getAllCategories } from '../../store/Category/Category.Selector';
import { Category } from '../../models/Category';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'products',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    NavbarComponent,
    CategoriesComponent,
    InfiniteScrollModule,
    CommonModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public totalProducts: Product[] = [];

  public errorMessage!: string;
  public offset = 0;
  public limit = 10;

  private store = inject(Store);
  private router = inject(Router);

  ngOnInit(): void {
    this.fetchProductsWithPagination(this.offset, this.limit);
  }

  fetchProducts() {
    this.store.dispatch(loadAllProducts());

    this.store.select(getAllProducts).subscribe((response) => {
      this.products = response;
    });
  }

  getProductsBycategory(id: number) {
    this.products.filter((p) => p.categoryId === id);
  }

  fetchProductsWithPagination(offset: number, limit: number) {
    this.store.dispatch(loadProductsWithPagination({ offset, limit }));

    this.store.select(getAllProductsWithPagination).subscribe((response) => {
      this.totalProducts = this.totalProducts.concat(response);
      this.products = this.products.concat(response);
    });
  }

  onScroll() {
    this.offset = this.offset + 10;

    this.store.dispatch(
      loadProductsWithPagination({ offset: this.offset, limit: this.limit })
    );

    this.store.select(getAllProductsWithPagination).subscribe((response) => {
      this.products = response;
    });
  }

  goToProductDetails(id: number) {
    this.router.navigate([`/products/${id}`]);
  }
  cleanString(str: string) {
    str = str.replace(/\\/g, '');
    str = str.replace(/"/g, '');
    str = str.replace(/\[/g, '');
    str = str.replace(/\]/g, '');
    return str;
  }

  urlChecking(array: string[], positonInArray: number): boolean {
    if (
      this.cleanString(array[positonInArray]).startsWith('http') &&
      (this.cleanString(array[positonInArray]).includes('jpg') ||
        this.cleanString(array[positonInArray]).includes('jpeg') ||
        this.cleanString(array[positonInArray]).includes('png') ||
        this.cleanString(array[positonInArray]).includes('image'))
    ) {
      return true;
    }
    return false;
  }
}
