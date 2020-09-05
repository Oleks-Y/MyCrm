import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Category} from "../Interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
// @ts-ignore
export class CategoriesService {
  constructor(private http: HttpClient) {}

  ferch() : Observable<Category[]>{
    return this.http.get<Category[]>('/api/category')
  }

  getById(id : string): Observable<Category>{
    return this.http.get<Category>(`/api/category/${id}`)
  }
}
