import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../services/products.service';
import {
  loadAllProducts,
  loadProductById,
  loadProductByIdFail,
  loadProductByIdSuccess,
  loadProductsWithPagination,
  loadProductsWithPaginationFail,
  loadProductsWithPaginationSuccess,
} from './Product.Actions';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  private action = inject(Actions);
  private productsService = inject(ProductsService);

  loadAllProducts = createEffect(() =>
    this.action.pipe(
      ofType(loadAllProducts),
      exhaustMap((action) =>
        this.productsService.getAllProducts().pipe(
          map((products) => loadProductsWithPaginationSuccess({ products })),
          catchError((error) =>
            of(loadProductsWithPaginationFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  loadProductWithPagination = createEffect(() =>
    this.action.pipe(
      ofType(loadProductsWithPagination),
      exhaustMap((action) =>
        this.productsService
          .getProductsWithPagination(action.offset, action.limit)
          .pipe(
            map((products) => loadProductsWithPaginationSuccess({ products })),
            catchError((error) =>
              of(
                loadProductsWithPaginationFail({ errorMessage: error.message })
              )
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
