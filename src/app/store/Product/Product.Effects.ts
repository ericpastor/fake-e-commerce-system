import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../services/products.service';
import {
  loadProductById,
  loadProductByIdFail,
  loadProductByIdSuccess,
  loadProducts,
  loadProductsFail,
  loadProductsSuccess,
} from './Product.Actions';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  private action = inject(Actions);
  private productsService = inject(ProductsService);

  loadProductWithPagination = createEffect(() =>
    this.action.pipe(
      ofType(loadProducts),
      exhaustMap((action) =>
        this.productsService.getAllProducts(action.offset, action.limit).pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError((error) =>
            of(loadProductsFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  loadProductById = createEffect(() =>
    this.action.pipe(
      ofType(loadProductById),
      exhaustMap((action) =>
        this.productsService.getProductById(action.id).pipe(
          map((product) => loadProductByIdSuccess({ product })),
          catchError((error) =>
            of(loadProductByIdFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );
}
