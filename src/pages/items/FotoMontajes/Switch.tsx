import { Agrega, Edita, Detalles } from ".";
import React, { useContext, useEffect, useState } from "react";
import { MenuComponent, NoPermissionComponent, NotFound } from "../../../components";
import { AuthContext } from "../../../context";
import { Permisos } from "../../../types";
import { userHasPermissionToAccess } from "../../../utils";

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
        setCurrentPermissionNeeded([]);
        setElementToShow(<MenuComponent toolId={toolId}/>)
        break;
      case 'agrega':
        setCurrentPermissionNeeded([Permisos.FOMO_WRITE]);
        setElementToShow(<Agrega/>);
        break;  
      case 'busca':
        setCurrentPermissionNeeded([Permisos.FOMO_READ]);
        //setElementToShow(<Busca query={id}/>);
        break;
      case 'detalles':
        setCurrentPermissionNeeded([Permisos.FOMO_READ]);
        setElementToShow(<Detalles id={id}/>);
        break;
      case 'edita':
        setCurrentPermissionNeeded([Permisos.FOMO_WRITE]);
        setElementToShow(<Edita id={id}/>);
        break;
      default: 
        setCurrentPermissionNeeded([]);
        setElementToShow(<NotFound errorMessage={`No existe la acción en Stills: ${action}`}/>);
        break;
    }
  }

  return (
    hasPermission? elementToShow: <NoPermissionComponent/>
  )
}