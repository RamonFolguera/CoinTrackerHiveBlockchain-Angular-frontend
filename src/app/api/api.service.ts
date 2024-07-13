import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getMessage(): Observable<string> {
    return this.http.get(`${this.baseUrl}/`, { responseType: 'text' }).pipe(
      map(response => response as string),
      catchError(error => {
        console.error('Error fetching message:', error);
        return [];
      })
    );
  }
}
