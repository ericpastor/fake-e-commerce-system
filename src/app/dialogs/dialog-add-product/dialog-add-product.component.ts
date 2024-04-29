import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { addProduct } from '../../store/Product/Product.Actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'dialog-add-product',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatIcon,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-add-product.component.html',
  styleUrl: './dialog-add-product.component.scss',
})
export class DialogAddProductComponent {
  addProductForm!: FormGroup;
  imagesArray = new FormArray([new FormControl('')]);
  private store = inject(Store);

  ngOnInit() {
    this.addProductForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      categoryId: new FormControl(0, [Validators.required]),
      images: this.imagesArray,
    });
  }
  get title() {
    return this.addProductForm.get('title');
  }
  get description() {
    return this.addProductForm.get('description');
  }
  get price() {
    return this.addProductForm.get('price');
  }
  get categoryId() {
    return this.addProductForm.get('categoryId');
  }
  get images() {
    return this.addProductForm.get('images') as FormArray;
  }

  addNewProduct() {
    const newProduct = {
      title: this.title?.value || '',
      description: this.description?.value || '',
      price: this.price?.value || 0,
      categoryId: this.categoryId?.value || 0,
      images: this.images?.value || [],
    };

    if (this.addProductForm.valid) {
      this.store.dispatch(addProduct({ productInput: newProduct }));
    }
  }

  addInputControl() {
    this.imagesArray.push(new FormControl('', Validators.required));
  }
  removeInputControl(idx: number) {
    this.imagesArray.removeAt(idx);
  }

  onSubmitAddingProduct(event: Event) {
    event.preventDefault();
    this.addNewProduct();
  }
}
