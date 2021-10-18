import {  Container, Divider, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import * as api from "../../../api/personalidades";
import { ApiContext } from "../../../context";
import { EditLinkComponent, ListDetailsComponent, NotFound } from "../../../components";

const titlePage = "Detalles Personalidad";

export const Detalles = (props: any) => {
  const { id } = props;
  const [ item, setItem ] = useState<any>(); 
  const [ errorPage, setErrorPage ] = useState<boolean>(true);
  const { requestApi } = useContext(ApiContext);

  const fetchData = async () => { 
    const { success, data } = await requestApi(api.lee(id));
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
      <NotFound errorMessage={`No existe la personalidad con id: ${id}`}/>)
    :(
    <Container component="main"  maxWidth="xl">
      <EditLinkComponent to={`../edita/${item.idcdCatPersonalidades}`}/> 
      <Typography variant='h4'>Detalles de la personalidad:</Typography>
      <ListDetailsComponent objeto={item}/>
      <Typography variant='h4'>Items relacionados a la personalidad:</Typography>
      {
        item.cdItems.map((relacion: any, index: number) => (
          <div key={index}>
            <Typography variant='h6'>{`Detalles del item ${index+1}:`}</Typography>
            <ListDetailsComponent 
              editButton 
              tipoItem="item" 
              idItem={relacion.idcdItem} 
              objeto={relacion}/>
            <Divider/>    
          </div>
        ))
      }
    </Container>
  ));
}