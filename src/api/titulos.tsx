import { Titulo } from "../types";
import { instance } from "./config";

export const inserta: any = async (body: Titulo) => {
    return instance.put(`/titulo`, body);
}

export const actualiza: any = async (body: Titulo) => {
    return instance.patch(`/titulo`, body);
}

export const lee: any = async (id: string) => {
    return instance.get(`/titulo?idcd_cat_titulos=${id}`);
}

export const busca: any = async (query: string, page: any) => {
    return instance.get(`/titulo/busca?${query}&take=${page.take}&skip=${page.skip}`);
}

export const asociadosToPersona: any = async (id: string) => {
    return instance.get(`/titulo/asociadosToPersona?idcd_personas=${id}`);
}

export const asociaItem: any = async (body: any) => {
    return instance.post('/titulo/asociaItem', body);
} 

export const desasociaItem: any = async (body: any) => {
    return instance.post('/titulo/desasociaItem', body);
} 
