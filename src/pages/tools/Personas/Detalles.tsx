import {  Container, Divider, ListItem, ListItemText, Typography, Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import * as api from "../../../api/personas";
import { asociadosToPersona } from "../../../api/titulos";
import { EditLinkComponent, ListDetailsComponent, NotFound, ButtonLinkComponent } from "../../../components";
import { ApiContext } from "../../../context";

const titlePage = "Detalles Personas";

const useStyles = makeStyles({
  link: {
    textDecoration: 'none'
  }
});

export const Detalles = (props: any) => {
  const { id } = props;
  const [ item, setItem ] = useState<any>(); 
  const [ titulos, setTitulos ] = useState<any>();
  const [ errorPage, setErrorPage ] = useState<boolean>(true);
  const { requestApi } = useContext(ApiContext);
  const classes = useStyles();

  const fetchData = async () => { 
    const { success, data } = await requestApi(api.lee(id));
    console.log(data);
    if(!success)return;
    setItem(data);
    setErrorPage(false);
  };

  const fetchDataTitulos = async () => {
    const {success, data} = await requestApi(asociadosToPersona(id));
    console.log(data);
    if(!success) return;
    setTitulos(data);
  };


  useEffect(() =>  {
    document.title = titlePage;
    fetchData();
    fetchDataTitulos();
  },[]);


  return (
    errorPage?(
      <NotFound errorMessage={`No existe la persona con id: ${id}`}/>)
    :(
    <Container component="main"  maxWidth="xl">
      <EditLinkComponent to={`../edita/${item.idcdPersonas}`}/> 
        <ButtonLinkComponent to={`../asocia`} label={`Asociar títulos.`}/>
      <Typography variant='h4'>Detalles de la persona:</Typography>
      <ListDetailsComponent objeto={item}/>
      <Typography variant='h4'>Títulos relacionados a la persona:</Typography>
      {
        titulos?.map((titulo: any, index: number) => (
          <div key={index}>
            <Typography variant='h6'>{`Detalles del título ${index+1}:`}</Typography>
            <ListItem>
              <ListItemText primary={`Rol: ${titulo.rol}`} />
            </ListItem>
            <ListDetailsComponent editButton tipoItem="titulos" idItem={titulo.idcdCatTitulos2.idcdCatTitulos} objeto={titulo.idcdCatTitulos2}/>
            <Divider/>    
          </div>
        ))
      }
    </Container>
  ));
}