import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:8085/ManajeroBackend/api'; // Update with your API base URL

  constructor(private http: HttpClient) { }

  getTotalIterations(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/iteration/count`);
  }

  getUserStoriesCount(iterationId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}//iteration/${iterationId}/userStories/count`);
  }

  getIterationProgressPercentage(iterationId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/iteration/${iterationId}/progress`);
  }

  isIterationOverdue(iterationId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/iterations/${iterationId}/overdue`);
  }
  
  getIterations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
