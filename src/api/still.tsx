import { Still } from "../types";
import { instance } from "./config";

export const inserta: any = (data: Still) => {
  return instance.put(`/still`, data);
}

export const actualiza: any = async (body: Still) => {
  return instance.patch(`/still`, body);
}

export const lee: any = async (id: string) => {
  return instance.get(`/still?idcd_item=${id}`);
}

export const busca: any = async (query: any /** TODO Type */) => {
  return instance.get(`/still/busca`, query);
}

export const baja: any = async (id: string) => {
  return instance.post(`/still/baja?idcd_item=${id}`);
}