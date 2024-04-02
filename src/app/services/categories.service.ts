import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private chosenCategoryId = signal(0);
  private readonly http = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this.http.get(`${environment.baseUrl}categories`);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}categories/${id}`);
  }

  setChosenCategoryId(update: number) {
    this.chosenCategoryId.set(update);
  }

  setCategoryIdToZero() {
    this.chosenCategoryId.set(0);
  }

  getChosenCategoryId() {
    return this.chosenCategoryId;
  }
}
