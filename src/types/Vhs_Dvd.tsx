import { Item } from ".";

export class Vhs_Dvd extends Item {
  itemHijo: {
    formato: string;
    color: string;
    audio: string;
    idioma: string;
    subtitulos: string;
    intertitulos: string;
    norma: string;
    duracion: string;
    region: string;
    pantalla: string;
    observaciones: string;
    extras: string;
  }

  constructor(){
    super();
    this.itemHijo = { 
      formato: "",
      color: "",
      audio: "",
      idioma: "",
      subtitulos: "",
      intertitulos: "",
      norma: "",
      duracion: "",
      region: "",
      pantalla: "",
      observaciones: "",
      extras: ""
     };
    this.tipo_item = "vhs_dvd"; 
  }
  
}