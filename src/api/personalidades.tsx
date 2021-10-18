import { Personalidad } from "../types";
import { instance } from "./config";

export const inserta: any = async (body: Personalidad) => {
    return instance.put(`/person`, body);
}

export const actualiza: any = async (body: Personalidad) => {
    return instance.patch(`/person`, body);
}

export const lee: any = async (id: string) => {
    return instance.get(`/person?idcd_cat_personalidades=${id}`);
}

export const busca: any = async (query: string, page: any) => {
    return instance.get(`/person/busca?query=${query}&take=${page.take}&skip=${page.skip}`);
}