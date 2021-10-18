import { TransPersonaTitulo } from ".";

export class Persona {
  idcd_personas?: string;
  nombre?: string;
  tipo_persona?: "F" | "M";
  ids_titulos_afectados?: Number[];
}

export interface AsociaPersona {
  idcd_cat_titulos: number;
  lista_relaciones: TransPersonaTitulo[];
}
