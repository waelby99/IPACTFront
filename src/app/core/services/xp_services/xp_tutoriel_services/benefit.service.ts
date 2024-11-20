import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Benefit } from './../../../models/xp_models/xp_tutoriel_model/Benefit';

@Injectable({
  providedIn: 'root'
})
export class BenefitService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/benefits';

  constructor(private http: HttpClient) {}

  getAllBenefits(): Observable<Benefit[]> {
    return this.http.get<Benefit[]>(this.apiUrl);
  }

  createBenefit(name: string, description: string, file: File): Observable<Benefit> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);

    return this.http.post<Benefit>(this.apiUrl, formData);
  }

  updateBenefit(id: string, name: string, description: string, file: File | null): Observable<Benefit> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    return this.http.put<Benefit>(`${this.apiUrl}/${id}`, formData);
  }

  deleteBenefit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
