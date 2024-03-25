import { Component, Input, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProductById } from '../../store/Product/Product.Actions';
import { getProductById } from '../../store/Product/Product.Selector';
import { Product } from '../../models/Product';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  @Input('id') productId!: number;

  public product: Product = {
    title: '',
    price: 0,
    description: '',
    images: [],
    categoryId: 0,
  };

  private productDetailsFromStore = inject(Store);

  ngOnInit(): void {
    this.fetchProductDetails(this.productId);
  }
  fetchProductDetails(id: number) {
    console.log(id);
    this.productDetailsFromStore.dispatch(loadProductById({ id }));
    this.productDetailsFromStore
      .select(getProductById)
      .subscribe((response) => {
        this.product = response;
      });
  }
}
