import { TransItemInterpretes } from ".";

export class Interprete {
  nombre: string;
  cdTransItemInterpretes?: TransItemInterpretes[];

  constructor(){
    this.nombre = '';
    this.cdTransItemInterpretes = [];
  }
}

export type AsociaInterp = {
  idcd_item: number;
  listaInterpretes: string[];
}
