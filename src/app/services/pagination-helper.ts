import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

import { PaginationResult } from '../models/pagination';

export function getPaginatedResult<T>(
  url: string,
  params: HttpParams,
  http: HttpClient,
  header: HttpHeaders
) {
  const paginatedResult: PaginationResult<T> = new PaginationResult<T>();

  return http.get<T>(url, { observe: 'response', params ,headers: header}).pipe(
    map((response) => {
      paginatedResult.result = response.body;
      if (response.headers.get('x-pagination') !== null) {
        paginatedResult.pagination = JSON.parse(
          response.headers.get('x-pagination') as string
        );
      }
      return paginatedResult;
    })
  );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let params = new HttpParams();

  params = params.append('pageNumber', pageNumber);
  params = params.append('pageSize', pageSize);

  return params;
}
