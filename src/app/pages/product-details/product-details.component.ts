import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProductById } from '../../store/Product/Product.Actions';
import { getProductById } from '../../store/Product/Product.Selector';
import { Product } from '../../models/Product';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatIconModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsComponent {
  @Input('id') productId!: number;

  public product: Product = {
    title: '',
    price: 0,
    description: '',
    images: [],
    category: { id: 0, name: '', image: '' },
  };

  private store = inject(Store);

  ngOnInit(): void {
    this.fetchProductDetails(this.productId);
  }
  fetchProductDetails(id: number) {
    this.store.dispatch(loadProductById({ id }));
    this.store.select(getProductById).subscribe((response) => {
      this.product = response;
    });
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
