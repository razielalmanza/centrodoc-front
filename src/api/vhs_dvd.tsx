import { Vhs_Dvd } from "../types";
import { instance } from "./config";

export const inserta: any = (data: Vhs_Dvd) => {
  return instance.put(`/vhsdvd`, data);
}

export const actualiza: any = async (body: Vhs_Dvd) => {
  return instance.patch(`/vhsdvd`, body);
}

export const lee: any = async (id: string) => {
  return instance.get(`/vhsdvd?idcd_item=${id}`);
}

export const busca: any = async (query: any /** TODO Type */) => {
  return instance.get(`/vhsdvd/busca`, query);
}

export const baja: any = async (id: string) => {
  return instance.post(`/vhsdvd/baja?idcd_item=${id}`);
}