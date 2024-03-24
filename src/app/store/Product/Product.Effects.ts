import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../services/products.service';
import {
  loadProducts,
  loadProductsFail,
  loadProductsSuccess,
} from './Product.Actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private action: Actions,
    private productsService: ProductsService
  ) {}
  loadProduct$ = createEffect(() =>
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
}
