import React, { useContext, useEffect, useState } from "react";
import { Agrega, Busca, Detalles, Edita, Asocia } from ".";
import { MenuComponent, NoPermissionComponent, NotFound } from "../../../components";
import { AuthContext } from "../../../context";
import { Permisos } from "../../../types";
import { userHasPermissionToAccess } from "../../../utils";

/**
 * Nota: Ninguna ruta tiene permisos requeridos, por tanto se deja por defecto el [] 
 * de permisos requeridos.
 */
export const Switch = (props: any) => {
  const { action, id, toolId } = props;
  const { user } = useContext(AuthContext);
  const [ hasPermission, setHasPermission ] = useState(false);
  const defaultPermision: Permisos[] = [];
  const [ elementToShow, setElementToShow] = useState(<NotFound/>);
  const [ currentPermissionNeeded, setCurrentPermissionNeeded]  = useState(defaultPermision);
  
  const obtainPermissionState = async () => {
    const permissionLocal = await userHasPermissionToAccess(currentPermissionNeeded, user?.permisos);
    setHasPermission(permissionLocal);
  };

  useEffect(() => {
    selector();
  }, [action]);

  useEffect(() => {
    obtainPermissionState();
  }, [currentPermissionNeeded]);

  const selector = () => {
    switch(action){
      case 'menu':
        setElementToShow(<MenuComponent toolId={toolId} asocia desasocia/>)
        break;
      case 'agrega':
        setElementToShow(<Agrega/>);
        break;  
      case 'busca':
        setElementToShow(<Busca query={id}/>);
        break;
      case 'detalles':
        setElementToShow(<Detalles id={id}/>);
        break;
      case 'edita':
        setElementToShow(<Edita id={id}/>);
        break;
      case 'asocia':
        setElementToShow(<Asocia defaultId={id}/>);
        break;
      case 'desasocia':
        setElementToShow(<Asocia defaultId={id} desasociaComponent/>);
        break;
      default: 
        setElementToShow(<NotFound errorMessage={`No existe la acción en Personas: ${action}`}/>);
        break;
    }
  }

  return (
    hasPermission? elementToShow: <NoPermissionComponent/>
  )
}