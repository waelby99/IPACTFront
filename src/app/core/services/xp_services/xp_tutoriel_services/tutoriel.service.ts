import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutoriel } from './../../../models/xp_models/xp_tutoriel_model/Tutoriel';

@Injectable({
  providedIn: 'root'
})
export class TutorielService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/tutoriels';

  constructor(private http: HttpClient) { }

  getTutoriel(id: string): Observable<Tutoriel> {
    return this.http.get<Tutoriel>(`${this.apiUrl}/${id}`);
  }
}
