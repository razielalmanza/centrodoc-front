import { Item } from ".";

export class Foto extends Item {
  itemHijo: {
    tama: string,
    color: string
  }

  constructor(){
    super();
    this.itemHijo = { tama: "", color: "" };
    this.tipo_item = "foro"; 
  }
  
}