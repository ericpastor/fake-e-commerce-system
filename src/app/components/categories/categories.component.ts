import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { CategoryModel } from '../../models/Category';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { getAllCategoriesInfo } from '../../store/Category/Category.Selector';
import { loadCategories } from '../../store/Category/Category.Actions';
import { NgStyle } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { PlaceholderSlidesComponent } from '../../placeholders/placeholder-slides/placeholder-slides.component';

@Component({
  selector: 'categories',
  standalone: true,
  imports: [NgStyle, PlaceholderSlidesComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriesComponent {
  categoriesInfo!: CategoryModel;

  private store = inject(Store);
  private router = inject(Router);
  private service = inject(CategoriesService);

  ngOnInit() {
    this.fetchAllCategories();
  }

  fetchAllCategories() {
    this.store.dispatch(loadCategories());
    this.store.select(getAllCategoriesInfo).subscribe((res) => {
      this.categoriesInfo = res;
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
