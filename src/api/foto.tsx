import { Foto } from "../types";
import { instance } from "./config";

export const inserta: any = (data: Foto) => {
  return instance.put(`/foro`, data);
}

export const actualiza: any = async (body: Foto) => {
  return instance.patch(`/foro`, body);
}

export const lee: any = async (id: string) => {
  return instance.get(`/foro?idcd_item=${id}`);
}

export const busca: any = async (query: any /** TODO Type */) => {
  return instance.get(`/foro/busca`, query);
}

export const baja: any = async (id: string) => {
  return instance.post(`/foro/baja?idcd_item=${id}`);
}