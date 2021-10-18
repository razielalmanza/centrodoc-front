import {  Container, Divider, Typography } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import * as api from "../../../api/interpretes";
import { ApiContext } from "../../../context";
import { ButtonLinkComponent, EditLinkComponent, ListDetailsComponent, NotFound } from "../../../components";

const titlePage = "Detalles Interprete";

export const Detalles = (props: any) => {
  const { nombre } = props;
  const [ item, setItem ] = useState<any>(); 
  const [ errorPage, setErrorPage ] = useState<boolean>(true);
  const { requestApi } = useContext(ApiContext);

  const fetchData = async () => { 
    const { success, data } = await requestApi(api.lee(nombre));
    console.log(data);
    if (!success) return;
    setItem(data);
    setErrorPage(false);
  };

  useEffect(() =>  {
    document.title = titlePage;
    fetchData();
  },[]);

  return (
    errorPage?(
      <NotFound errorMessage={`No existe el interprete: ${nombre}`}/>)
    :(
    <Container component="main"  maxWidth="xl">
      <EditLinkComponent to={`../edita/${item.nombre}`}/> 
      <Typography variant='h4'>Detalles del interprete:</Typography>
      <ListDetailsComponent objeto={item}/>
      <Typography variant='h4'>Relaciones del interprete:</Typography>
      {
        item.cdTransItemInterpretes.map((relacion: { idcdItem2: any; }, index: number) => (
          <div key={index}>
            <Typography variant='h6'>{`Detalles de la relación ${index+1}:`}</Typography>
            <ListDetailsComponent objeto={relacion}/>
            <Typography variant='h6'>{`Detalles del item de la relación ${index+1}:`}</Typography>
            <ListDetailsComponent 
              editButton 
              tipoItem={relacion.idcdItem2.tipoItem} 
              idItem={relacion.idcdItem2.idcdItem} 
              objeto={relacion.idcdItem2}/>
            <Divider/>    
          </div>
        ))
      }
    </Container>
  ));
}