import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Practice } from './../../../models/xp_models/xp_tutoriel_model/Practice';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/practices'; // Adjust this according to your API endpoint

  constructor(private http: HttpClient) {}

  getAllPractices(): Observable<Practice[]> {
    return this.http.get<Practice[]>(`${this.apiUrl}`);
  }

  getPracticeById(id: string): Observable<Practice> {
    return this.http.get<Practice>(`${this.apiUrl}/${id}`);
  }

  createPractice(practice: Practice): Observable<Practice> {
    return this.http.post<Practice>(`${this.apiUrl}`, practice);
  }

  deletePractice(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(error => {
          console.error('Failed to delete practice:', error);
          return throwError(error);
        })
      );
  }
  
  updatePractice(practice: Practice): Observable<Practice> {
    const url = `${this.apiUrl}/${practice.id}`; // Adjust API endpoint
    return this.http.put<Practice>(url, practice);
  }
  
}
