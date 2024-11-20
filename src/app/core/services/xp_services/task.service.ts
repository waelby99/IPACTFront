import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/xp_models/Task';
import { UserStory } from '../../models/xp_models/UserStory';
import { Bug } from '../../models/xp_models/Bug';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8085/ManajeroBackend/api/task';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/updateTask`, task);
  }
  updateTaskWithUserStory(task: Task, userStoryId: string | null): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${task.id}?userStoryId=${userStoryId}`,task );
  }
  
  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  getUserStoryOfTask(taskId: string): Observable<UserStory> {
    return this.http.get<UserStory>(`${this.baseUrl}/${taskId}/userStory`);
  }

  addTaskAndAssignTaskToUserStory(userStoryId: string, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/addTaskAndAssignTaskToUserStory/${userStoryId}`, task);
  }
  getBugsByTaskId(taskId: string): Observable<Bug[]> {
    return this.http.get<Bug[]>(`${this.baseUrl}/${taskId}/bug`);
  }
  
  getBugsCount(taskId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${taskId}/bugs/count`);
  }

  getTaskCountByStatus(status: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`, { params: { status } });
  }

  getTaskStatusDistribution(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/status-distribution`);
  }
  getBugsInIncompleteTasks(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/incomplete-tasks-with-bugs`);
  }
  getCountTotaltasks(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/total`);
  }
}
