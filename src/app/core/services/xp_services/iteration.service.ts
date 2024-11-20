import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Iteration } from '../../models/xp_models/Iteration';  // Adjust the path as needed
import { UserStory } from '../../models/xp_models/UserStory';  // Adjust the path as needed
@Injectable({
  providedIn: 'root'
})
export class IterationService {
  private baseUrl = 'http://localhost:8085/ManajeroBackend/api/iteration';

  constructor(private http: HttpClient) {}
  getAllIterations(): Observable<Iteration[]> {
    return this.http.get<Iteration[]>(this.baseUrl);
  }

  getIterationById(id: string): Observable<Iteration> {
    return this.http.get<Iteration>(`${this.baseUrl}/${id}`);
  }

  addIteration(iteration: Iteration): Observable<Iteration> {
    return this.http.post<Iteration>(this.baseUrl, iteration);
  }

  updateIteration(id: string, iteration: Iteration): Observable<Iteration> {
    return this.http.put<Iteration>(`${this.baseUrl}/${id}`, iteration);
  }

  deleteIteration(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getUserStoriesOfIteration(iterationId: string): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(`${this.baseUrl}/${iterationId}/userStories`);
  }
  addIterationAndAssignToProject(projectId: string, iteration: Iteration): Observable<Iteration> {
    const url = `${this.baseUrl}/addIterationAndAssignIterationToProject/${projectId}`;
    return this.http.post<Iteration>(url, iteration);
  }
 
  getTotalIterations(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  getUserStoriesCount(iterationId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${iterationId}/userStories/count`);
  }

  getIterationProgressPercentage(iterationId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${iterationId}/progress`);
  }
  getIterationDuration(iterationId: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/${iterationId}/duration`);
  }

  isIterationOverdue(iterationId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${iterationId}/overdue`);
  }

  getIterations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
  // New method to get completed user stories
  getCompletedUserStories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/completed-user-stories`);
  }
  getMultipleXAxisChartData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/multiple-x-axis`);
  }
  getIterationProcessData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/process-data`);
  }
  
}
