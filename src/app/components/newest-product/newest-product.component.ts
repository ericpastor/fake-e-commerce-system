import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/Product';
import { Observable } from 'rxjs';

@Component({
  selector: 'newest-product',
  standalone: true,
  imports: [],
  templateUrl: './newest-product.component.html',
  styleUrl: './newest-product.component.scss',
})
export class NewestProductComponent implements OnInit {
  newestProduct!: Product
  public products!: Observable<Product[]>;

  productsService = inject(ProductsService);

  ngOnInit(): void {
    this.fetchNewestProduct();
  }

  fetchNewestProduct() {
    this.products = this.productsService.getProducts();

    this.products.subscribe((products) => {
      products.sort(
        (a, b) =>
          new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()
      );

      this.newestProduct = products[0];
    });
  }
}
