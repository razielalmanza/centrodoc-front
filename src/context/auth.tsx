import React, { useEffect, useState } from "react";
import { User } from "../types";
import { getUserFromToken } from "../utils";

export const AuthContext = React.createContext<IProps>( {user: null, isAuth: false, iniciaSesion: (nombre: string) => null, cerrarSesion: () => null});

interface IProps {
  user: User | null;
  isAuth: boolean;
  iniciaSesion: (token: string) => void; 
  cerrarSesion: () => void;
}

/** 
 * Contexto que entrega a sus componentes hijos las funciones Cerrar e Iniciar sesión,
 * Además de los valores: 
 * isAuth: boolean, para saber si se ha loggeado en el sitiom este depente si existe un usuario valido. 
 * Y el usuario: User donde está el usuario completo y sus permisos.
 * Hace uso de un hook en el que ligado a la variable needRefresh, se verifica cuando se inicia/cierra sesión.
 * Se logra haciendo un 'switch' (on/off) de este variable, triggereando el hook. 
 * Este hook actualiza las variables isAuth y user. Apoyándose de recibir la inofrmación del localstorage.
 * Al obtener un token del localstorage decide si tiene un usuario válido o no. La varible isAuth depende de esta verificación.
 * Este hook también se triggerea en la primera ejecución de la app. 
 * Por tanto los datos están actualizados cuando se inicia la app y cuando se inicia/cierra sesión.
 */
export const AuthProvider: React.FC = ({ children }) => { 
  const [ isAuth, setIsAuth ] = useState<boolean>(false);
  const [ user, setUser ] = useState<User | null>(null);
  const [ needRefresh, setNeedRefresh ] = useState<boolean>(false);

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    const usr: User | null = getUserFromToken(token);
    setUser(usr);
    setIsAuth(usr? true: false);
  }, [needRefresh]); 

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setNeedRefresh(() => !needRefresh);
  }

  const iniciaSesion = (token: string) => {
    localStorage.setItem('token', token);
    setNeedRefresh(() => !needRefresh);
  };

  const values: IProps = { user: user, isAuth: isAuth, iniciaSesion: iniciaSesion, cerrarSesion: cerrarSesion};
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};