import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { Product, ProductModel } from '../../models/Product';
import { Store } from '@ngrx/store';
import { loadAllProducts } from '../../store/Product/Product.Actions';
import { getAllProducts } from '../../store/Product/Product.Selector';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchComponent {
  public productsToFilter!: ProductModel;
  public productsFound: Product[] = [];
  public alreadyFetched: boolean = false;

  public dialogOpenState = false;
  public searchControl = new FormControl();
  public formGroup = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  private formSubscription!: Subscription;
  private router = inject(Router);
  private store = inject(Store);

  fetchAllProducts() {
    if (!this.alreadyFetched) {
      this.store.dispatch(loadAllProducts());
      this.store.select(getAllProducts).subscribe((response) => {
        this.productsToFilter = response;
        this.alreadyFetched = true;
      });
    }
  }

  searchProducts() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
    this.formGroup.valueChanges.subscribe((value) => {
      if (typeof value.title === 'string') {
        this.productsFound = this.productsToFilter.products.filter((p) =>
          p.title.toLocaleLowerCase().includes(value.title!.toLocaleLowerCase())
        );
        console.log('Productos encontrados:', this.productsFound);
        this.dialogOpenState = true;
      }
    });
  }

  cancel() {
    this.dialogOpenState = false;
    this.formGroup.reset();
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
