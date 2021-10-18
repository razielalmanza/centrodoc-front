import { Item } from ".";

export class Personalidad {
  idcd_cat_personalidades: string;
  nombre_artistico: string;
  nombre_verdadero: string | null;
  sobrenombre: string | null;
  a_r_acervo_repetido: number | null;
  listaItems: Item[] | null;

  constructor(){
    this.idcd_cat_personalidades = '';
    this.nombre_artistico = '';
    this.nombre_verdadero =  null
    this.sobrenombre = null
    this.a_r_acervo_repetido = null;
    this.listaItems = [];
  }
}
