import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';


export abstract class BaseService<T> {
  constructor(
    protected http: HttpClient,
    private endpoint: string
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${environment.baseUrl}/${this.endpoint}`);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${environment.baseUrl}/${this.endpoint}/${id}`);
  }

  create(item: FormData | T): Observable<T> {
    return this.http.post<T>(`${environment.baseUrl}/${this.endpoint}`, item);
  }

  update(id: string, item: FormData | T): Observable<T> {
    return this.http.put<T>(`${environment.baseUrl}/${this.endpoint}/${id}`, item);
  }
  updateByPost(id: string, item: FormData | T): Observable<T> {
    return this.http.post<T>(`${environment.baseUrl}/${this.endpoint}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/${this.endpoint}/${id}`);
  }
}
