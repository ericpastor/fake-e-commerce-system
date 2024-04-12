import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product, ProductModel } from '../../models/Product';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadAllProducts } from '../../store/Product/Product.Actions';
import { getAllProducts } from '../../store/Product/Product.Selector';

@Component({
  selector: 'newest-product',
  standalone: true,
  imports: [],
  templateUrl: './newest-product.component.html',
  styleUrl: './newest-product.component.scss',
})
export class NewestProductComponent implements OnInit, OnDestroy {
  infoProducts: ProductModel = { products: [], errorMessage: '' };
  newestProduct!: Product;

  productSubscription!: Subscription;

  private store = inject(Store);
  private router = inject(Router);

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  fetchAllProducts() {
    this.store.dispatch(loadAllProducts());
    this.store.select(getAllProducts).subscribe((res) => {
      this.infoProducts = res;
      this.fetchNewestProduct();
    });
  }

  fetchNewestProduct() {
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

      const latestProductsSlice = productsWithCreationDate[0];

      this.newestProduct = latestProductsSlice;
    }
  }

  goToProductDetails() {
    this.router.navigate([`/products/${this.newestProduct.id}`]);
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
