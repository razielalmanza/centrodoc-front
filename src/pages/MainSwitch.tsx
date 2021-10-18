import React, { useEffect, useContext, useState } from "react";
import { NotFound } from "../components";
import { SearchContext } from "../context";
import { Switch as InterpSwitch } from "./tools/Interpretes/Switch";
import { Switch as PersonSwitch } from "./tools/Personalidades/Switch";
import { Switch as TitulosSwitch } from "./tools/Titulos/Switch";
import { Switch as PersonasSwitch } from "./tools/Personas/Switch";
import { Switch as StillSwitch } from "./items/Still/Switch";
import { Switch as FomoSwitch } from "./items/FotoMontajes/Switch";
import { Switch as FotoSwitch } from "./items/FotoRodajes/Switch";
import { Switch as CartelSwitch } from "./items/Cartel/Switch";
import { Switch as VhsDvdSwitch } from "./items/Vhs_Dvd/Switch";
import { MainCatValues } from "./tools/CatValues";
import { urlPathItem } from "../utils";


export const MainSwitch = (props: any) => {
  const [ toolId ] = useState<string>(props.match.params.tool);
  const action: string = props.match.params.action;
  const id: string = props.match.params.id;
  const { setSearch } = useContext(SearchContext);
  const [ elementToShow, setElementToShow] = useState(<NotFound/>);

  useEffect(() => {
    /** 
     * Actualiza la búsuqeda global según el /toolId/ al que el usuario haya entrado.
     * Solo se actualiza cuando se ha cambiado el toolId, es decir, cuando
     * el usuario va de una herramienta a otra desde la url, de interpretes a personas, etc
     */
    setSearch(toolId);
  }, [toolId]);

  useEffect(() => {
    /**
     * Actuliza la herramienta que mostrar según se actualice
     */
    selector();
  }, [toolId, action, id]);

  const selector = () => {
    switch(toolId){
      case urlPathItem.INTERP:
        setElementToShow(<InterpSwitch toolId={toolId} action={action} id={id}/>);
        break;
      case urlPathItem.PERSON:
        setElementToShow(<PersonSwitch toolId={toolId} action={action} id={id}/>);
        break;
      case urlPathItem.TITULOS:
        setElementToShow(<TitulosSwitch toolId={toolId} action={action} id={id}/>);
        break;
      case urlPathItem.PERSONAS:
        setElementToShow(<PersonasSwitch toolId={toolId} action={action} id={id}/>);
        break;
      case urlPathItem.CATVALUES:
        setElementToShow(<MainCatValues/>);
        break;
      case urlPathItem.STILLS:
        setElementToShow(<StillSwitch toolId={toolId} action={action} id={id}/>);
        break;
      case urlPathItem.FOMO:
        setElementToShow(<FomoSwitch toolId={toolId} action={action} id={id}/> );
        break;
      case urlPathItem.FOTO:
        setElementToShow(<FotoSwitch toolId={toolId} action={action} id={id}/>);
        break;
      case urlPathItem.CARTEL:
        setElementToShow(<CartelSwitch toolId={toolId} action={action} id={id}/>);
        break;
      case urlPathItem.VHSDVD:
        setElementToShow(<VhsDvdSwitch toolId={toolId} action={action} id={id}/>);
        break;
      default: 
        setElementToShow(<NotFound errorMessage={`No hay tool con este nombre (aún): ${toolId}`}/>);
        break;
    }
  }

  return (
    elementToShow
  )
}