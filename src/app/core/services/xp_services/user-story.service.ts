import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Iteration } from '../../models/xp_models/Iteration';  // Adjust the path as needed
import { UserStory } from '../../models/xp_models/UserStory';  // Adjust the path as needed
import { Task } from '../../models/xp_models/Task';  // Adjust the path as needed
@Injectable({
  providedIn: 'root'
})
export class UserStoryService {
private baseUrl = 'http://localhost:8085/ManajeroBackend/api/userStory';

  constructor(private http: HttpClient) { }

  getAllUserStories(): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(this.baseUrl);
  }

  getUserStoryById(id: string): Observable<UserStory> {
    return this.http.get<UserStory>(`${this.baseUrl}/${id}`);
  }

  addUserStory(userStory: UserStory): Observable<UserStory> {
    return this.http.post<UserStory>(this.baseUrl, userStory);
  }

  updateUserStory(userStory: UserStory): Observable<UserStory> {
    return this.http.put<UserStory>(`${this.baseUrl}/updateUserStory`, userStory);
  }

  deleteUserStory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  createUserStory(userStory: UserStory): Observable<UserStory> {
    return this.http.post<UserStory>(`${this.baseUrl}/create`, userStory);
  }

  
  getIterationOfUserStory(userStoryId: string): Observable<Iteration> {
    return this.http.get<Iteration>(`${this.baseUrl}/${userStoryId}/iteration`);
  }
 
 // Get tasks of a specific user story
  getTasksOfUserStory(userStoryId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${userStoryId}/task`);
  }
   // Add the new method
   addUserStoryAndAssignUserStoryToIteration(userStory: UserStory, iterationId: string): Observable<UserStory> {
    return this.http.post<UserStory>(`${this.baseUrl}/addUserStoryAndAssignUserStoryToIteration/${iterationId}`, userStory);
  }

  getCountByStatus(status: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/status`, {
      params: new HttpParams().set('status', status)
    });
  }

  getCountCompletedUserStories(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/completed`);
  }

  getCountTotalUserStories(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/total`);
  }

  getCountUserStoriesByPriority(priority: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/priority`, {
      params: new HttpParams().set('priority', priority)
    });
  }

  getAverageTasksPerUserStory(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/averageTasks`);
  }

  getUserStoryStatusDistribution(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/status-distribution`);
  }
  getUserStoryPriorityDistribution(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/priority-distribution`);
  }
  updateUserStory2(userStory: UserStory, iterationId: string | null): Observable<UserStory> {
    return this.http.put<UserStory>(`${this.baseUrl}/${userStory.id}?iterationId=${iterationId}`, userStory);
  }
  
  }