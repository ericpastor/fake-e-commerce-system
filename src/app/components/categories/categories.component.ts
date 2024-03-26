import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
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
  public scrollButtons = document.querySelectorAll('.next-btn, .prev-btn');
  public categories: Category[] = [];

  private store = inject(Store);
  private router = inject(Router);

  ngOnInit() {
    this.fetchAllCategories();
    this.scrollButtons.forEach((button) => {
      button.addEventListener('click', this.handleScrollButtonClick);
    });
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

  handleScrollButtonClick(event: any) {
    const container = event.target
      .closest('.category-slider')
      .querySelector('.category-list');
    const direction = event.target.classList.contains('next-btn') ? 1 : -1;
    container.scrollLeft += direction * 500;
  }
}
