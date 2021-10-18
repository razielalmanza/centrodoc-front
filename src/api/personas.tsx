import { AsociaPersona, Persona } from "../types";
import { instance } from "./config";
import { asociadosToPersona }  from "./titulos";

export const inserta: any = (data: Persona) => {
  return instance.put(`/persona`, data);
}

export const actualiza: any = async (body: Persona) => {
  return instance.patch(`/persona`, body);
}

export const lee: any = async (id: string) => {
  return instance.get(`/persona?idcd_personas=${id}`);
}

export const busca: any = async (query: string, page: any) => {
  return instance.get(`/persona/busca?nombre=${query}&take=${page.take}&skip=${page.skip}`);
}

export const asociadasToTitulo: any = async (id: string) => {
  return instance.post(`/persona/asociadasToTitulo?idcd_cat_titulos=${id}`);
}

export const asocia: any = async (data: AsociaPersona) => {
  return instance.post(`/persona/asocia?idcd_cat_titulos=${data.idcd_cat_titulos}`, data.lista_relaciones);
}

export const desasocia: any = async (data: AsociaPersona) => {
  return instance.post(`/persona/desasocia?idcd_cat_titulos=${data.idcd_cat_titulos}`, data.lista_relaciones);
}

export const rolesPersona: any = async (idPersona: string, idTitulo: string) => {
  console.log(idPersona, idTitulo);
  /** ESTO DEBERÍA IR EN BACKEND */
  const request = await asociadosToPersona(idPersona);
  let listaRoles: string[] = [];
  if(request && request.data.success){
    request.data.data.map((e: any) => {
      if(e.idcdCatTitulos == idTitulo ){
        e.cdTransPersonasCatTitulos.map((val: any) => {
          listaRoles.push(val.rol);
        })
      }
    })
  }
  return listaRoles;
} 