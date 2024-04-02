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
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'categories',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriesComponent {
  public categories: Category[] = [];

  private store = inject(Store);
  private router = inject(Router);
  private service = inject(CategoriesService);

  ngOnInit() {
    this.fetchAllCategories();
  }

  fetchAllCategories() {
    this.store.dispatch(loadCategories());
    this.store.select(getAllCategories).subscribe((response) => {
      this.categories = response;
    });
  }

  gotToCategories() {
    this.router.navigate(['categories']);
  }

  goToProducts() {
    this.router.navigate(['products']);
  }

  handleClick(categoryId: number) {
    this.service.setChosenCategoryId(categoryId);
    this.goToProducts();
  }
}
