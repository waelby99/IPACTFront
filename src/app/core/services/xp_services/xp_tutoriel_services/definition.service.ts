import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Definition } from './../../../models/xp_models/xp_tutoriel_model/definition';
@Injectable({
  providedIn: 'root'
})
export class DefinitionService {


  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/definitions';

  constructor(private http: HttpClient) { }

  getDefinitions(): Observable<Definition[]> {
    return this.http.get<Definition[]>(this.apiUrl);
  }

  getDefinition(id: string): Observable<Definition> {
    return this.http.get<Definition>(`${this.apiUrl}/${id}`);
  }

  createDefinition(definition: Definition): Observable<Definition> {
    return this.http.post<Definition>(this.apiUrl, definition);
  }

  updateDefinition(id: string, definition: Definition): Observable<Definition> {
    return this.http.put<Definition>(`${this.apiUrl}/${id}`, definition);
  }

  deleteDefinition(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
