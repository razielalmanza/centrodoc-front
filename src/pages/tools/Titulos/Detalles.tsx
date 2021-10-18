import {  Container, Divider, Typography } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import * as api from "../../../api/titulos";
import { ApiContext } from "../../../context";
import { ListDetailsComponent, NotFound, EditLinkComponent } from "../../../components";

const titlePage = "Detalles Título";

export const Detalles = (props: any) => {
  const { id } = props;
  const [ item, setItem ] = useState<any>(); 
  const [ errorPage, setErrorPage ] = useState<boolean>(true);
  const { requestApi } = useContext(ApiContext);

  const fetchData = async () => { 
    const { success, data } = await requestApi(api.lee(id));
    console.log(data);
    if(!success) return;
    setItem(data);
    setErrorPage(false);
  };

  useEffect(() =>  {
    document.title = titlePage;
    fetchData();
  },[]);

  return (
    errorPage?(
      <NotFound errorMessage={`No existe el título con id: ${id}`}/>)
    :(
    <Container component="main"  maxWidth="xl">
      <EditLinkComponent to={`../edita/${item.idcdCatTitulos}`}/> 
      <Typography variant='h4'>Detalles del título:</Typography>
      <ListDetailsComponent objeto={item}/>
      <Typography variant='h4'>items relacionados al título:</Typography>
      {
        item.cdItems.map((relacion: any, index: number) => (
          <div key={index}>
            <Typography variant='h6'>{`Detalles del item ${index+1}:`}</Typography>
            <ListDetailsComponent objeto={relacion}/>
            <Divider/>    
          </div>
        ))
      }
    </Container>
  ));
}