import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../models/Product';
import { loadProducts } from '../../store/Product/Product.Actions';
import { getAllProducts } from '../../store/Product/Product.Selector';
import { NavbarComponent } from '../navbar/navbar.component';

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
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  public products: Product[] = [];
  public offset = 0;
  public limit = 10;
  public currentPage = 0;

  private productsFromStore = inject(Store);

  ngOnInit(): void {
    this.fetchProducts(this.offset, this.limit);
  }

  fetchProducts(offset: number, limit: number) {
    this.productsFromStore.dispatch(loadProducts({ offset, limit }));
    this.productsFromStore.select(getAllProducts).subscribe((response) => {
      this.products = response;
    });
  }

  nextPage() {
    this.currentPage++;
    this.offset = this.offset + 10;

    this.fetchProducts(this.offset, this.limit);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.offset = this.offset - 10;
      this.fetchProducts(this.offset, this.limit);
    }
  }
}
