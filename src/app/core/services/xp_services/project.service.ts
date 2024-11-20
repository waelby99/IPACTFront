import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8085/ManajeroBackend/api/project'; // Update with your actual backend URL

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

 

  
}
