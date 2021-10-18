import { FormValuesLogin } from "../pages/Login";
import { instance } from "./config";

export const login: any = async (body: FormValuesLogin) => {
  try {
    return await instance.post('/login', body);}
  catch(error) {
    return error.response;
  }
}