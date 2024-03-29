import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { Category } from '../../models/Category';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { getAllCategories } from '../../store/Category/Category.Selector';
import { loadCategories } from '../../store/Category/Category.Actions';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'categories',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriesComponent {
  @Output() addChosenCategoryEvent = new EventEmitter<string>();
  public categories: Category[] = [];

  private store = inject(Store);
  private router = inject(Router);

  ngOnInit() {
    this.fetchAllCategories();
  }

  fetchAllCategories() {
    this.store.dispatch(loadCategories());
    this.store.select(getAllCategories).subscribe((response) => {
      this.categories = response;
    });
  }

  chosenCategory(category: string) {
    this.addChosenCategoryEvent.emit(category);
  }

  gotToCategories() {
    this.router.navigate(['categories']);
  }

  goToProducts() {
    this.router.navigate(['products']);
  }

  handleClick(category: string) {
    this.chosenCategory(category);
    this.goToProducts();
  }
}
