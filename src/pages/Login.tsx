import { login } from "../api/login";
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context';
import { useToasts } from 'react-toast-notifications';
import { LoginComponent } from '../components';

export type FormValuesLogin = {
  usuario: string;
  password: string;
}

const titlePage: string = "Inicia sesión";

export const Login = () => {
  const { register, handleSubmit, formState: {errors}, reset } = useForm<FormValuesLogin>();
  const [ isLoading, setIsLoading ] = useState(false);
  const { iniciaSesion } = useContext(AuthContext);
  const { addToast } = useToasts();
  
  useEffect(() => {
    document.title = titlePage;
  }, []);

  const onSubmit = async (data: FormValuesLogin) => {
    setIsLoading(true);
    const request = await login(data);
    setIsLoading(false);
    if(!request) {
      addToast('ERROR: sin conexión a server', { appearance: 'error' });
      return;
    }
    if (request.data.success){
      addToast('Inicio de sesión exitoso', { appearance: 'success'});
      iniciaSesion(request.data.token);
    }else{
      addToast(request.data.message, { appearance: 'warning' });
      reset();
    }
  };

  return (
   <LoginComponent onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} errors={errors} isLoading={isLoading}/>
 )
}
