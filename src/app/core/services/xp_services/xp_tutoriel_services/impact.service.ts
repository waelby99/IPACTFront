// impact.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Impact } from './../../../models/xp_models/xp_tutoriel_model/Impact';

@Injectable({
  providedIn: 'root'
})
export class ImpactService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/impacts';

  constructor(private http: HttpClient) {}

  getAllImpacts(): Observable<Impact[]> {
    return this.http.get<Impact[]>(this.apiUrl);
  }

  createImpact(name: string, description: string, file: File): Observable<Impact> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);

    return this.http.post<Impact>(this.apiUrl, formData);
  }

  updateImpact(id: string, name: string, description: string, file: File | null): Observable<Impact> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    return this.http.put<Impact>(`${this.apiUrl}/${id}`, formData);
  }

  deleteImpact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
