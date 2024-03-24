import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductsService } from '../../services/products.service';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../store/Product/Product.Actions';
import { getAllProducts } from '../../store/Product/Product.Selector';
import { Product } from '../../models/Product';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
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
