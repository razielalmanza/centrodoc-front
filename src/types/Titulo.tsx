import { Persona } from ".";

export class Titulo {
  idcd_cat_titulos?: string;

  titulo_original?: string;

  titulo_en_espa?: string;

  anio?: number;

  anio_fin?: number | null;

  pais_de_realizacion?: string | null;

  circa?: boolean;
  listaPersonas?: Persona[];

  constructor(){
    this.idcd_cat_titulos = '';
    this.titulo_original = '';
    this.titulo_en_espa= '';    
    this.anio = 0;
    this.anio_fin = null;
    this.pais_de_realizacion = null;
    this.circa = false;
    this.listaPersonas = [];
  }
}

export interface AsociaItem {
  idcd_cat_titulos: number;
  idcd_item: number;
}