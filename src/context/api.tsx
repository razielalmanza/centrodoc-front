import React from "react";
import { useToasts } from "react-toast-notifications";
import { ResponseAPI } from "../types";

export const ApiContext = React.createContext<IProps>({ requestApi: async () => null });

interface IProps {
  requestApi: (request: any, setIsLoading?: (value: boolean) => void) => Promise<any>;
}

export const ApiProvider: React.FC = ({ children }) => { 
  const { addToast } = useToasts();

  const executeRequest = async (req: any) => {
    try {
      return await req;
    }
    catch(error: any) {
      return error.response;
    }
  };

  const requestApi = async (request: any, setIsLoading?: (value: boolean) => void): Promise<any> => {
    const responseFail = { success: false };
    if(setIsLoading) setIsLoading(true);

    const result = await executeRequest(request);
    if (setIsLoading) setIsLoading(false);

    if(!result) {
      addToast('ERROR: sin conexión a server', { appearance: 'error'});
      return responseFail as ResponseAPI;
    }

    if (!result.data){
      console.log(result);
      addToast("ERROR: checar logs de consola.", { appearance: 'error'});
      return responseFail as ResponseAPI;
    }

    if(!result.data.success){
      console.log("Error: ", result.data.message);
      addToast(result.data.message, { appearance: 'warning'});
      return responseFail as ResponseAPI;
    }

    return { message: result.data.message || null, 
      data: result.data.data || null, 
      count: result.data.count || null,
      success: result.data.success
    } as ResponseAPI;
  }

  const values: IProps = { requestApi: requestApi };
  return (
    <ApiContext.Provider value={values}>
      {children}
    </ApiContext.Provider>
  );
};