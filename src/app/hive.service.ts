import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HiveService {
  private apiUrl = 'http://localhost:3000';  // URL de tu servidor backend

  constructor(private http: HttpClient) {}

  getTokens(username: string): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/tokens/${username}`))
      .then(response => {
        console.log('Tokens response from backend:', response);  // Log de la respuesta de la API
        return response;
      });
  }
}
