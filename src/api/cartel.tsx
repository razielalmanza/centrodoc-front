import { Cartel } from "../types";
import { instance } from "./config";

export const inserta: any = (data: Cartel) => {
  console.log(data);
  return instance.put(`/cartel`, data);
}

export const actualiza: any = async (body: Cartel) => {
  return instance.patch(`/cartel`, body);
}

export const lee: any = async (id: string) => {
  return instance.get(`/cartel?idcd_item=${id}`);
}

export const busca: any = async (query: any /** TODO Type */) => {
  return instance.get(`/cartel/busca`, query);
}

export const baja: any = async (id: string) => {
  return instance.post(`/cartel/baja?idcd_item=${id}`);
}