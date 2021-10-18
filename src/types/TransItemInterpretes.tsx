import { Item, /*Interprete*/ } from ".";

export class TransItemInterpretes {
  idcd_item: string;
  nombre: string;
  xy_start: string | null;
  xy_end: string | null;
  //nombre2: Interprete;
  idcd_item2: Item;

  constructor(){
    this.idcd_item = '';
    this.nombre = '';
    this.xy_start = null;
    this.xy_end = null;
    //this.nombre2 = new Interprete();
    this.idcd_item2 = new Item();
  }
}
