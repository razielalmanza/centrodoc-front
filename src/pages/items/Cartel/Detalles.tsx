import { Typography, Container } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { lee } from "../../../api/cartel";
import { ListDetailsComponent, NotFound, EditLinkComponent, ButtonLinkComponent } from "../../../components";

const titlePage = "Detalles Cartel";

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
    if(!data.cdItemCartel){ 
      addToast(`El item con id: [${id}] no es del tipo Cartel.`, {appearance: 'error'});
      return;
    }
    setItem(data);
    setItemHijo(data.cdItemCartel);
    setErrorPage(false);
  }; 
 
  
  return (
    errorPage?
    (<NotFound errorMessage={`No existe el Cartel con id: [${id}] o no es de tipo Cartel`}/>)
    :(
    <Container component="main" maxWidth="xl">
      <EditLinkComponent to={`../edita/${id}`}/> 
      <ButtonLinkComponent to={`/interpretes/asocia/${item.idcdItem}`} label={`Asociar Intérpretes`}/>
      <ButtonLinkComponent to={`/titulos/asocia/${item.idcdItem}`} label={`Asociar títulos`}/>
      <ButtonLinkComponent to={`/digital/asocia/${item.idcdItem}`} label={`Asociar item digital`}/>
      <Typography variant='h4'>Detalles del item: {id}:</Typography>
      <ListDetailsComponent objeto={item}/>
      <Typography variant='h4'>Detalles específicos del Cartel con id: {id}:</Typography>
      <ListDetailsComponent objeto={itemHijo}/>
    </Container>
    )
  )
}