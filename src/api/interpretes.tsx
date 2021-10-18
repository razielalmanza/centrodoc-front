import { Interprete } from "../types";
import { instance } from "./config";

export const inserta: any = async (data: Interprete) => {
    //console.log(localStorage.getItem('token'));
    return instance.put(`/interprete?id=${data.nombre}`);
}

export const actualiza: any = async (id: string, body: any) => {
    return instance.patch(`/interprete?id=${id}`, body);
}

export const lee: any = async (id: string) => {
    return instance.get(`/interprete?id=${id}`);
}

export const busca: any = async (query: string, page: any) => {
    return instance.get(`/interprete/busca?nombre=${query}&take=${page.take}&skip=${page.skip}`);
}

export const asocia: any = async (body: any) => {
    return instance.post(`/interprete/asocia`, body);
}

export const desasocia: any = async (body: any) => {
    return instance.post(`/interprete/desasocia`, body);
}