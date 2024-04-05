import { Injectable, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadItems, loadItemsFail, loadItemsSuccess } from './Cart.Actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class CartEffects {
  private action = inject(Actions);
  private service = inject(CartService);

  loadItems = createEffect(() =>
    this.action.pipe(
      ofType(loadItems),
      exhaustMap(() =>
        this.service.getCartItems().pipe(
          map((cartItems) => loadItemsSuccess({ cartItems })),
          catchError((error) =>
            of(loadItemsFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );
}
