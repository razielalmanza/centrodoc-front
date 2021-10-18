import { instance } from "./config";

export const leeItemGenerico: any = async (id: string) => {
  return instance.get(`/item?idcd_item=${id}`);
}