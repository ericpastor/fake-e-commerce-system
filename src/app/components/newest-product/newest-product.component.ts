import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/Product';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'newest-product',
  standalone: true,
  imports: [],
  templateUrl: './newest-product.component.html',
  styleUrl: './newest-product.component.scss',
})
export class NewestProductComponent implements OnInit {
  newestProduct!: Product;
  public products!: Observable<Product[]>;

  private productsService = inject(ProductsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.fetchNewestProduct();
  }

  fetchNewestProduct() {
    this.products = this.productsService.getAllProducts();

    this.products.subscribe((products) => {
      products.sort((a, b) =>
        a.creationAt && b.creationAt
          ? new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()
          : a.category.id! - b.category.id!
      );

      this.newestProduct = products[0];
    });
  }

  goToProductDetails() {
    this.router.navigate([`/products/${this.newestProduct.id}`]);
  }
}
