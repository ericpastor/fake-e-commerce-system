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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideStore(appReducers),
    provideEffects([ProductEffects]),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
