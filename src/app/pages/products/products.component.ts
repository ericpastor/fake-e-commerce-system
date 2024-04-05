import { Component, OnDestroy, OnInit, Signal, inject } from '@angular/core';
import { shareReplay, takeUntil } from 'rxjs/operators';
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

import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { Subject, Subscription } from 'rxjs';

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
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public totalProducts: Product[] = [];
  public filteredProducts: Product[] = [];
  public categories: Category[] = [];
  chosenCategoryFromHome!: Signal<number>;
  public selectedCategory = '';
  public panelOpenState = false;
  public errorMessage!: string;
  public categoryId: number = 0;
  public offset = 0;
  public limit = 10;

  private cache: Record<number, Product[]> = [];
  private service = inject(CategoriesService);
  private store = inject(Store);
  private router = inject(Router);

  ngOnInit(): void {
    this.fetchCategories();
    this.getChosenCategoryFromHome();
    if (
      this.chosenCategoryFromHome() === 0 &&
      this.categoryId === 0 &&
      this.selectedCategory !== 'All Categories'
    ) {
      this.fetchProductsWithPagination(0, 10);
    }
    if (this.chosenCategoryFromHome() > 0) {
      this.filterByCategory(this.chosenCategoryFromHome());
      this.getCategoryNameById(this.chosenCategoryFromHome());
    }
  }

  getChosenCategoryFromHome() {
    this.chosenCategoryFromHome = this.service.getChosenCategoryId();
    if (this.chosenCategoryFromHome() > 0) {
      this.categoryId = this.chosenCategoryFromHome();
    }
  }

  fetchCategories() {
    this.store.dispatch(loadCategories());
    this.store.select(getAllCategories).subscribe((response) => {
      this.categories = response;
    });
  }

  getCategoryNameById(id: number) {
    const categoryFound = this.categories.find((c) => c.id === id);
    if (categoryFound) this.selectedCategory = categoryFound.name;
  }

  fetchProductsWithPagination(offset: number, limit: number) {
    if (this.chosenCategoryFromHome() === 0 && this.categoryId === 0) {
      this.store.dispatch(loadProductsWithPagination({ offset, limit }));
      this.store.select(getAllProductsWithPagination).subscribe((response) => {
        this.totalProducts = this.totalProducts.concat(response);
        this.products = this.products.concat(response);
      });
    }
  }

  sortByHighestPrice() {
    this.totalProducts.sort((a, b) => b.price - a.price);
  }

  sortByLowestPrice() {
    this.totalProducts.sort((a, b) => a.price - b.price);
  }
  filterByCategory(categoryId: number) {
    this.service.setCategoryIdToZero();
    this.store.dispatch(loadAllProducts());
    this.categoryId = categoryId;
    this.store.select(getAllProducts).subscribe((response) => {
      if (categoryId) {
        this.filteredProducts = response.filter(
          (p) => p.category.id === categoryId
        );
      }
      this.totalProducts = this.filteredProducts;
    });
  }

  resetFilters() {
    this.totalProducts = [];
    this.categoryId = 0;
    this.service.setCategoryIdToZero();
    this.selectedCategory = 'All Categories';
    this.totalProducts = this.products;
  }

  onScroll(categoryId: number) {
    if (categoryId === 0) {
      this.offset = this.offset + 10;

      this.store.dispatch(
        loadProductsWithPagination({ offset: this.offset, limit: this.limit })
      );

      this.store.select(getAllProductsWithPagination).subscribe((response) => {
        this.products = response;
      });
    }
  }

  goToProductDetails(id: number) {
    this.router.navigate([`/products/${id}`]);
  }

  titleCategory(name: string) {
    this.selectedCategory = name;
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
