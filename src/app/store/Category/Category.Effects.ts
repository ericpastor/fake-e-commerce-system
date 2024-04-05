import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesService } from '../../services/categories.service';
import {
  loadCategoryById,
  loadCategoryByIdFail,
  loadCategoryByIdSuccess,
  loadCategories,
  loadCategoriesFail,
  loadCategoriesSuccess,
} from './Category.Actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class CategoryEffects {
  private action = inject(Actions);
  private categoriesService = inject(CategoriesService);

  loadCategories = createEffect(() =>
    this.action.pipe(
      ofType(loadCategories),
      exhaustMap((action) =>
        this.categoriesService.getAllCategories().pipe(
          map((categories) => loadCategoriesSuccess({ categories })),
          catchError((error) =>
            of(loadCategoriesFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  loadCategoryById = createEffect(() =>
    this.action.pipe(
      ofType(loadCategoryById),
      exhaustMap((action) =>
        this.categoriesService.getCategoryById(action.id).pipe(
          map((category) => loadCategoryByIdSuccess({ category })),
          catchError((error) =>
            of(loadCategoryByIdFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );
}
