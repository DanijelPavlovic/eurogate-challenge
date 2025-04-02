import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {Params} from '@angular/router';

export interface CustomRequest {
  page?: number;
  limit?: number;
}

interface Pagination {
  offset: number;
  limit: number;
  total: number;
}

export interface CustomResponse<T> {
  data: T,
  pagination: Pagination
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http: HttpClient = inject(HttpClient);
  API_URL = '/assets/chocolate-data.json';

  public buildQueryParams(request: CustomRequest): Params {
    const params: Params = {};

    if (request.page) params['page'] = request.page;
    if (request.limit) params['limit'] = request.limit;

    return params;
  }

  fetchData<T>(request: CustomRequest): Observable<CustomResponse<T>> {
    console.log('fetchData', request);
    return this._http.get<CustomResponse<T>>(this.API_URL);
  }

  get<T>(id: number | string): Observable<T> {
    return this._http.get<T>(`${this.API_URL}/${id}`);
  }

  update<T>( id: number | string, payload: Partial<T>): Observable<T> {
    return this._http.post<T>(`${this.API_URL}/${id}`, payload);
  }
}
