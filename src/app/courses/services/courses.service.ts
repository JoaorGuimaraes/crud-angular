import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

import { Course } from './../model/course';

//O decorador @Injectable() define uma classe como um serviço em Angular e permite que Angular a injete em um componente como uma dependência
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses'

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Course[]>(this.API);
  }

  findById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  delete(course: Course){
    return this.httpClient.delete(`${this.API}/${course.id}`);
  }

  save(course: Partial<Course>) {
    if (course.id){
      return this.update(course);
    }
    return this.create(course);
  }

  private create(course: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, course);
  }

  private update(course: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${course.id}`, course);
  }
}
