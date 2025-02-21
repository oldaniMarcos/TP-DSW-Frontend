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

  rol: string
}

export interface Animal {
  nroHistClinica?: number,
  nombre: string,
  fechaNac: string,
  edad: number,
  idCliente: number,
  idRaza: number,
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
  valor: number,
  idAnimal: number,
  idPrecio: number,
  idVeterinario: number,
  idsInsumos: number[],
}

export interface PrecioAtencion {
  idPrecioAtencion?: number,
  fechaDesde: string,
  valor: number,
}

export interface Insumo {
  codInsumo?: number,
  descripcion: string,
  stock: number,
  fechaVencimiento: string,
  idTipoInsumo: number,
}

export interface PrecioInsumo {
  codPrecioInsumo?: number,
  fechaDesde: string,
  valor: number,
  valorVenta: number,
  idInsumo: number,
}

export interface Especie {
  codEspecie?: number,
  descripcion: string,
}

export interface Raza {
  codRaza?: number,
  descripcion: string,
  idEspecie: number,
}

export interface TipoInsumo {
  codTipoInsumo?: number,
  descripcion: string,
}