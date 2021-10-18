
//import { Item } from ".";
//import { CdContenedores } from "./CdContenedores";

export class ItemDigital {
  idcd_item: string;
  extension: string;
  resolucion: string;
  dpi: number | null;
  espacio_color: null;
  profundidad_bits: number | null;
  nombre_archivo: string;
  nombre_proxy: string;
  //idcdItem2: Item;
  //cdContenedores: CdContenedores[];

  constructor(){
    this.idcd_item = '';
    this.extension = '';
    this.resolucion = '';
    this.dpi = null;
    this.espacio_color = null;
    this.profundidad_bits = null;
    this.nombre_archivo = '';
    this.nombre_proxy = '';
  }
}
