import { instance } from "./config";

export const CatRequests = {
  TipoItem: '/catTipoItem',
  TamCartel: '/catCartelTamanio',
  FotoColor: '/catFotoColor',
  VideoExtras: '/catVideoExtras',
  VideoFormato: '/catVideoFormato',
  VideoPantalla: '/catVideoPantalla',  
}


export const catTipoItem: any = async (request: string, page: any) => {
  
  try {
    return await instance.get(`${request}?take=${page.take}&skip=${page.skip}`);
  }
  catch(error) {
    return error.response;
  }
}