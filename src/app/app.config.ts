import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './store/Product/Product.Effects';
import { appReducers } from './store/app.store';
import { CategoryEffects } from './store/Category/Category.Effects';
import { cartItemsMetaReducer } from './store/Cart/Cart.Reducer';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideStore(appReducers, {
      metaReducers: cartItemsMetaReducer as any,
    }),
    provideEffects([ProductEffects, CategoryEffects]),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideToastr(),
  ],
};
