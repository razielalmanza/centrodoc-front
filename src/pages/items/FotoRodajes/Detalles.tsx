import { Typography, Container } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { lee } from "../../../api/foto";
import { ListDetailsComponent, NotFound, EditLinkComponent, ButtonLinkComponent } from "../../../components";

const titlePage = "Detalles Foto Rodaje";

export const Detalles = (props: any) => {
  const { id } = props;
  const [ item, setItem ] = useState<any>(); 
  const [ itemHijo, setItemHijo ] = useState<any>(); 
  const { requestApi } = useContext(ApiContext);
  const [ errorPage, setErrorPage ] = useState<boolean>(true);
  const { addToast } = useToasts();

  useEffect(() =>  {
    document.title = titlePage;
    fetchData();
  },[]);

  const fetchData = async () => {
    const { success, data } = await requestApi(lee(id));
    console.log(success, data);
    if(!success) return;
    if(!data.cdItemFotoRodaje){ 
      addToast(`El item con id: [${id}] no es del tipo Foto Rodaje.`, {appearance: 'error'});
      return;
    }
    setItem(data);
    setItemHijo(data.cdItemFotoRodaje);
    setErrorPage(false);
  }; 
 
  
  return (
    errorPage?
    (<NotFound errorMessage={`No existe el foto rodaje con id: [${id}] o no es de tipo foto rodaje`}/>)
    :(
    <Container component="main"  maxWidth="xl">
      <EditLinkComponent to={`../edita/${id}`}/> 
      <ButtonLinkComponent to={`/interpretes/asocia/${item.idcdItem}`} label={`Asociar intérpretes`}/>
      <ButtonLinkComponent to={`/titulos/asocia/${item.idcdItem}`} label={`Asociar títulos`}/>
      <ButtonLinkComponent to={`/digital/asocia/${item.idcdItem}`} label={`Asociar item digital`}/>
      <Typography variant='h4'>Detalles del item: {id}:</Typography>
      <ListDetailsComponent objeto={item}/>
      <Typography variant='h4'>Detalles específicos del Foto Rodaje con id: {id}:</Typography>
      <ListDetailsComponent objeto={itemHijo}/>
    </Container>
    )
  )
}