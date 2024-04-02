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
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'latest-products',
  standalone: true,
  imports: [CommonModule, MatIconModule],
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
          : a.category.id! - b.category.id!
      );

      this.latestProducts = products.slice(0, 9);
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
