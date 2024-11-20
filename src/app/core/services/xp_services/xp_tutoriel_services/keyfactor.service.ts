import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeyFactor } from './../../../models/xp_models/xp_tutoriel_model/KeyFactor';

@Injectable({
  providedIn: 'root'
})
export class KeyFactorService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/keyfactors';

  constructor(private http: HttpClient) {}

  getAllKeyFactors(): Observable<KeyFactor[]> {
    return this.http.get<KeyFactor[]>(this.apiUrl);
  }


    createKeyFactor(titre: string, description: string): Observable<KeyFactor> {
    const body = { titre, description };
    return this.http.post<KeyFactor>(this.apiUrl, body);
  }

  updateKeyFactor(id: string, titre: string, description: string): Observable<KeyFactor> {
    const updatedKeyFactor = { id, titre, description };
    return this.http.put<KeyFactor>(`${this.apiUrl}/${id}`, updatedKeyFactor);
  }
  

  deleteKeyFactor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
