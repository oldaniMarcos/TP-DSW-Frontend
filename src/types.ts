import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

//interface generica de opciones

export interface Options {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  context?: HttpContext;
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?: {
    includeHeaders?: string[];
  } | boolean;
}

export interface Cliente {
  id?: number,
  dni: string,
  nombreYApellido: string,
  telefono: string,
  direccion: string,
  email: string,
  usuario: string,
  password: string,
}

export interface Veterinario {
  idVeterinario?: number,
  nroMatricula: string,
  dni: string,
  nombreYApellido: string,
  telefono: string,
  direccion: string,
  email: string,
}

export interface Atencion {
  idAtencion?: number,
  fechaHora: string,
  resultado: string,
  observaciones: string,
}