import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diagram } from './../../../models/xp_models/xp_tutoriel_model/Diagram';

@Injectable({
  providedIn: 'root'
})
export class DiagramService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/diagrams';

  constructor(private http: HttpClient) {}

  getDiagrams(): Observable<Diagram[]> {
    return this.http.get<Diagram[]>(this.apiUrl);
  }

  createDiagram(name: string, file: File): Observable<Diagram> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);

    return this.http.post<Diagram>(this.apiUrl, formData);
  }

  updateDiagram(id: string, formData: FormData): Observable<Diagram> {
    return this.http.put<Diagram>(`${this.apiUrl}/${id}`, formData);
  }

  deleteDiagram(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
