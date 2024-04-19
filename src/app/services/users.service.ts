import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.baseUrl}users`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}users/${id}`);
  }
}
