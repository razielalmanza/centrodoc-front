import { Fomo } from "../types";
import { instance } from "./config";

export const inserta: any = (data: Fomo) => {
  return instance.put(`/fomo`, data);
}

export const actualiza: any = async (body: Fomo) => {
  return instance.patch(`/fomo`, body);
}

export const lee: any = async (id: string) => {
  return instance.get(`/fomo?idcd_item=${id}`);
}

export const busca: any = async (query: any /** TODO Type */) => {
  return instance.get(`/fomo/busca`, query);
}

export const baja: any = async (id: string) => {
  return instance.post(`/fomo/baja?idcd_item=${id}`);
}