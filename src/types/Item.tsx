import { Cartel, ItemDigital, Still } from ".";

export class Item {
  idcd_item: string;
  idcd_cat_titulos: string | null;
  idcd_cat_personalidades: string | null;
  fecha_hora_insercion: Date | null;
  tipo_item: string;
  imagen_digital: string | null;
  campos_comunes: string | null;
  foto_old_interpretes: string | null;
  activo: boolean;
  colocacion: string | null;
  notas: string | null;
  itemDigital: ItemDigital | null;
  //itemHijo: Cartel | Still |null ; /* tdos los demas tipos de item*/

  constructor(){
    this.idcd_item = '';
    this.idcd_cat_titulos = null;
    this.idcd_cat_personalidades = null;
    this.fecha_hora_insercion = null;
    this.tipo_item = '';
    this.imagen_digital = null;
    this.campos_comunes = null;
    this.foto_old_interpretes = null;
    this.activo = false;
    this.colocacion = null;
    this.notas = null;
    this.itemDigital = null;
    //this.itemHijo = null;
  }
}
