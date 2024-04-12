import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { loadAllProducts } from '../../store/Product/Product.Actions';
import { getAllProducts } from '../../store/Product/Product.Selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'latest-products',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './latest-products.component.html',
  styleUrl: './latest-products.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LatestProductsComponent implements OnInit, OnDestroy {
  infoProducts: ProductModel = { products: [], errorMessage: '' };
  latestProducts: ProductModel = { products: [], errorMessage: '' };

  productSubscription!: Subscription;

  private store = inject(Store);
  private router = inject(Router);

  ngOnInit(): void {
    if (this.infoProducts.products.length === 0) {
      this.fetchAllProducts();
    }
  }

  fetchAllProducts() {
    this.store.dispatch(loadAllProducts());
    this.productSubscription = this.store
      .select(getAllProducts)
      .subscribe((res) => {
        this.infoProducts = res;
        this.getLatestProducts();
      });
  }

  getLatestProducts() {
    if (
      this.infoProducts &&
      this.infoProducts.products &&
      this.infoProducts.products.length > 0
    ) {
      const productsWithCreationDate = this.infoProducts.products
        .filter((product) => product.creationAt)
        .map((product) => ({
          ...product,
          creationDate: new Date(product.creationAt!),
        }));

      productsWithCreationDate.sort(
        (a, b) => b.creationDate.getTime() - a.creationDate.getTime()
      );

      const latestProductsSlice = productsWithCreationDate.slice(0, 9);

      this.latestProducts.products = latestProductsSlice;
    }
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

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
