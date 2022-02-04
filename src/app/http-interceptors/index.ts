import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductInterceptor } from './product-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ProductInterceptor, multi: true },
];