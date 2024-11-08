import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Options } from '../../types.js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  // T es un tipo generico, por lo que esta funcion puede manejar cualquier tipo de dato
  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>
  }

  // B tambien es un tipo generico, hacer esto es mejor que body: any ya que con any puedo mandar cualquier cosa y me lo va a tomar
  post<T, B>(url: string, body: B, options: Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>
  }

  patch<T, B>(url: string, body: B, options: Options): Observable<T> {
    return this.httpClient.patch<T>(url, body, options) as Observable<T>
  }

  delete<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(url, options) as Observable<T>
  }
}
