import { Item } from ".";

export class Cartel extends Item {
  itemHijo: {
    institucion: string,
    pais: string,
    tama: string,
    ejemplares: string,
    diseniador: string,
    tecnica: string,
    estado_fisico: string,
    car_consulta: string
  }

  constructor(){
    super();
    this.itemHijo = { 
      institucion : "",
      pais: "",
      tama: "", 
      ejemplares: "",
      diseniador: "",
      tecnica: "",
      estado_fisico: "",
      car_consulta: "",
    };
    this.tipo_item = "cartel"; 
  }
  
}