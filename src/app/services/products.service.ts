import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  getAllProducts(offset: number, limit: number): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}products?offset=${offset}&limit=${limit}`
    );
  }

  getProducts(): Observable<any> {
    return this.http.get(`${environment.baseUrl}products`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}products/${id}`);
  }
}
