import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../models/Product';
import { loadProducts } from '../../store/Product/Product.Actions';
import { getAllProducts } from '../../store/Product/Product.Selector';
import { NavbarComponent } from '../navbar/navbar.component';
import { loadCategories } from '../../store/Category/Category.Actions';
import { getAllCategories } from '../../store/Category/Category.Selector';
import { Category } from '../../models/Category';

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
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public categories: Category[] = [];
  public offset = 0;
  public limit = 10;
  public currentPage = 0;

  private store = inject(Store);
  private router = inject(Router);

  ngOnInit(): void {
    this.fetchProducts(this.offset, this.limit);
    this.fetchCategories();
  }
  fetchCategories() {
    this.store.dispatch(loadCategories());
    this.store.select(getAllCategories).subscribe((response) => {
      this.categories = response;
    });
  }

  fetchProducts(offset: number, limit: number) {
    this.store.dispatch(loadProducts({ offset, limit }));
    this.store.select(getAllProducts).subscribe((response) => {
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

  goToProductDetails(id: number) {
    this.router.navigate([`/products/${id}`]);
  }
}
