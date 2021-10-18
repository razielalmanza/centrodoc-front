import { Item } from ".";

export class Fomo extends Item {
  itemHijo: {
    ejemplares: string,
    pais: string
  }

  constructor(){
    super();
    this.itemHijo = { ejemplares: "", pais: "" };
    this.tipo_item = "fomo"; 
  }
  
}