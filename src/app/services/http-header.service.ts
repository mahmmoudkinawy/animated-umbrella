import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {

  constructor(private http: HttpClient) { }

  Get(endPoint: string): Observable<any> {
    return this.http.get(baseUrl + endPoint);
  }

  Post(endPoint: string, model: any): Observable<any> {
    return this.http.post<any>(baseUrl + endPoint, model);
  }

  Put(endPoint: string, model: any, header: HttpHeaders): Observable<any> {
    return this.http.put<any>(baseUrl + endPoint, model, {
      headers: header,
    });
  }

  Delete(endPoint: string, header: HttpHeaders): Observable<any> {
    return this.http.delete<any>(baseUrl + endPoint, {
      headers: header,
    });
  }

  getHeader(endPoint: string, header: HttpHeaders): Observable<any> {
    return this.http.get(baseUrl + endPoint, { headers: header });
  }

}
