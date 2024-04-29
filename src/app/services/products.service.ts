import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  getProductsWithPagination(offset: number, limit: number): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}products?offset=${offset}&limit=${limit}`
    );
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${environment.baseUrl}products`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}products/${id}`);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(`${environment.baseUrl}products`, product);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(`${environment.baseUrl}products`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}products/${id}`);
  }
}
