import { Component, OnInit, Signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product, ProductModel } from '../../models/Product';
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
import { getAllCategoriesInfo } from '../../store/Category/Category.Selector';
import { CategoryModel } from '../../models/Category';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { Subscription } from 'rxjs';
import { PlaceholderProductsListComponent } from '../../placeholders/placeholder-products-list/placeholder-products-list.component';
import { PlaceholderCategoryListComponent } from '../../placeholders/placeholder-category-list/placeholder-category-list.component';

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
    PlaceholderProductsListComponent,
    PlaceholderCategoryListComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  public allLoadedProducts: Product[] = [];
  public products: Product[] = [];
  public totalProducts: ProductModel = { products: [], errorMessage: '' };
  public productsWithPagination: ProductModel = {
    products: [],
    errorMessage: '',
  };
  public filteredProducts: ProductModel = { products: [], errorMessage: '' };
  public categories!: CategoryModel;
  chosenCategoryFromHome!: Signal<number>;
  public selectedCategory = '';
  public panelOpenState = false;
  public errorMessage!: string;
  public categoryId: number = 0;
  public offset = 0;
  public limit = 10;

  public totalIsActive = true;

  categorySubscription!: Subscription;
  productSubscription!: Subscription;

  private service = inject(CategoriesService);
  private store = inject(Store);
  private router = inject(Router);

  ngOnInit(): void {
    this.fetchCategories();
    this.getChosenCategoryFromHome();
    if (this.chosenCategoryFromHome() === 0 && this.categoryId === 0) {
      this.fetchProductsWithPagination(0, 10);
    }
    if (this.chosenCategoryFromHome() > 0) {
      this.filterByCategory(this.chosenCategoryFromHome());
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
    this.categorySubscription = this.store
      .select(getAllCategoriesInfo)
      .subscribe((response) => {
        this.categories = response;
      });
  }

  getCategoryNameById(id: number) {
    const categoryFound = this.categories.categories.find((c) => c.id === id);
    if (categoryFound) this.selectedCategory = categoryFound.name;
  }
  fetchProductsWithPagination(offset: number, limit: number) {
    if (this.chosenCategoryFromHome() === 0 && this.categoryId === 0) {
      this.store.dispatch(loadProductsWithPagination({ offset, limit }));

      this.productSubscription = this.store
        .select(getAllProductsWithPagination)
        .subscribe((response) => {
          if (response && response.length > 0) {
            this.totalProducts.products = response;
            this.productSubscription.unsubscribe();
          }
        });
    }
  }

  onScroll(categoryId: number) {
    this.offset += 10;
    if (categoryId === 0) {
      this.store.dispatch(
        loadProductsWithPagination({ offset: this.offset, limit: this.limit })
      );
      let subscription: Subscription;
      subscription = this.store
        .select(getAllProductsWithPagination)
        .subscribe((response) => {
          if (response && response.length > 0) {
            const newProducts = response.filter(
              (product) =>
                !this.totalProducts.products.some(
                  (existingProduct) => existingProduct.id === product.id
                )
            );
            const updatedProducts = [
              ...this.totalProducts.products,
              ...newProducts,
            ];
            this.allLoadedProducts = updatedProducts;

            this.totalProducts.products = updatedProducts;
          }

          if (subscription) {
            subscription.unsubscribe();
          }
        });
    }
  }

  sortByHighestPrice() {
    this.totalProducts.products.sort((a, b) => b.price - a.price);
  }

  sortByLowestPrice() {
    this.totalProducts.products.sort((a, b) => a.price - b.price);
  }

  filterByCategory(categoryId: number) {
    this.service.setCategoryIdToZero();
    this.store.dispatch(loadAllProducts());
    this.categoryId = categoryId;
    this.store.select(getAllProducts).subscribe((response) => {
      if (categoryId) {
        this.filteredProducts.products = response.products.filter(
          (p) => p.category?.id === categoryId
        );
      }
      if (
        this.filteredProducts &&
        this.filteredProducts.products &&
        this.filteredProducts.products.length > 0
      ) {
        this.totalProducts.products = this.filteredProducts.products;
      }
    });
  }

  resetFilters() {
    this.categoryId = 0;
    this.service.setCategoryIdToZero();
    this.selectedCategory = 'All Categories';
    if (this.chosenCategoryFromHome() === 0 && this.categoryId === 0) {
      this.fetchProductsWithPagination(0, 10);
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

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
