import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/Product';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'latest-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latest-products.component.html',
  styleUrl: './latest-products.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LatestProductsComponent implements OnInit {
  latestProducts!: Product[];
  public products!: Observable<Product[]>;

  private productsService = inject(ProductsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.fetchLatestProducts();
  }

  fetchLatestProducts() {
    this.products = this.productsService.getAllProducts();

    this.products.subscribe((products) => {
      products.sort((a, b) =>
        a.creationAt && b.creationAt
          ? new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()
          : a.categoryId - b.categoryId
      );

      this.latestProducts = products.slice(0, 9);
      console.log('imagen de [0]', this.cleanString(products[0].images[0]));
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
}
