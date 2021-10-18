import { Item } from ".";

export class Still extends Item {
  itemHijo: {
    a_r_: number,
    a_f_total_ejemplares: string
  }

  constructor(){
    super();
    this.itemHijo = { a_r_: 0, a_f_total_ejemplares: "" };
    this.tipo_item = "still"; 
  }
  
}