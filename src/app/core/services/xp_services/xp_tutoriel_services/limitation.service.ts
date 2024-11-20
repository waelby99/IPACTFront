// limitation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Limitation } from './../../../models/xp_models/xp_tutoriel_model/Limitation';

@Injectable({
  providedIn: 'root'
})
export class LimitationService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/limitations';

  constructor(private http: HttpClient) {}

  getAllLimitations(): Observable<Limitation[]> {
    return this.http.get<Limitation[]>(this.apiUrl);
  }

  getLimitationById(id: string): Observable<Limitation> {
    return this.http.get<Limitation>(`${this.apiUrl}/${id}`);
  }

  createLimitation( description: string, file: File): Observable<Limitation> {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('file', file);

    return this.http.post<Limitation>(this.apiUrl, formData);
  }

  updateLimitation(id: string, formData: FormData): Observable<Limitation> {
    return this.http.put<Limitation>(`${this.apiUrl}/${id}`, formData);
  }

  deleteLimitation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
