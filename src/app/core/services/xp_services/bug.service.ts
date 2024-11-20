import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bug } from '../../models/xp_models/Bug';

@Injectable({
  providedIn: 'root'
})
export class BugService {
  private baseUrl = 'http://localhost:8085/ManajeroBackend/api/bug';

  constructor(private http: HttpClient) { }

  getAllBugs(): Observable<Bug[]> {
    return this.http.get<Bug[]>(`${this.baseUrl}/getAllBugs`);
  }

  addBug(bug: Bug): Observable<Bug> {
    return this.http.post<Bug>(`${this.baseUrl}`, bug);
  }

  deleteBug(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateBug(bug: Bug): Observable<Bug> {
    return this.http.put<Bug>(`${this.baseUrl}/updateBug`, bug);
  }

  getBugById(id: string): Observable<Bug> {
    return this.http.get<Bug>(`${this.baseUrl}/${id}`);
  }

  addBugAndAssignBugToTask(bug: Bug, taskId: string): Observable<Bug> {
    return this.http.post<Bug>(`${this.baseUrl}/addBugAndAssignBugToTask/${taskId}`, bug);
  }
  getTaskForBug(bugId: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${bugId}/task`);
  }
  countBugsByStatus(status: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/countByStatus?status=${status}`);
  }

  getAverageBugProgress(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/average-progress`);
  }

  getBugsStatusDistribution(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/status-distribution`);
  }

  getBugsCountPerTask(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/count-per-task`);
  }
  getCountTotalBugs(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/total`);
  }
}