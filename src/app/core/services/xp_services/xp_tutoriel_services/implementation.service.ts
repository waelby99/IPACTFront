import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Implementation } from './../../../models/xp_models/xp_tutoriel_model/Implementation';

@Injectable({
  providedIn: 'root'
})
export class ImplementationService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/implementations';

  constructor(private http: HttpClient) {}

  getAllImplementations(): Observable<Implementation[]> {
    return this.http.get<Implementation[]>(this.apiUrl);
  }

  createImplementation(name: string, description: string, file: File): Observable<Implementation> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);

    return this.http.post<Implementation>(this.apiUrl, formData);
  }

  updateImplementation(id: string, name: string, description: string, file: File | null): Observable<Implementation> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    return this.http.put<Implementation>(`${this.apiUrl}/${id}`, formData);
  }

  deleteImplementation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
