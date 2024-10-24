import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Category {
  id: string;
  name: string;
  description: string;
  // Agrega más campos según sea necesario
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.api}/category`).pipe(
      catchError(this.handleError)
    );
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.api}/category/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createCategory(categoryData: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.api}/category`, categoryData).pipe(
      catchError(this.handleError)
    );
  }

  updateCategory(id: string, categoryData: Category): Observable<Category> {
    return this.http.put<Category>(`${environment.api}/category/${id}`, categoryData).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/category/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getMainCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.api}/category/main/list`).pipe(
      catchError(this.handleError)
    );
  }

  getAllCategoriesPaginate(limit: number, skip: number): Observable<Category[]> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('skip', skip.toString());

    return this.http.get<Category[]>(`${environment.api}/category/page`, { params }).pipe(
      catchError(this.handleError)
    );
  }
}
