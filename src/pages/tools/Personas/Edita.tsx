import { CssBaseline, Typography, Container, FormGroup, FormControlLabel, Checkbox, TextField} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { Persona } from "../../../types";
import { useStylesAgrega } from "../../styles";
import * as api from "../../../api/personas";
import { ButtonLoadingCustom, NotFound, TextFieldCustom } from "../../../components";
import { Alert } from "@material-ui/lab";
import { ApiContext } from "../../../context";


const titlePage = "Edita Persona";

export const Edita = (props: any) => {
  const { id } = props; 
  const [ item, setItem ] = useState<any>(); 
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ errorPage, setErrorPage ] = useState<boolean>(true);
  const [ tipoCheck, setTipoCheck ] = useState<boolean>(true);
  const { register, handleSubmit, formState: {errors}} = useForm<Persona>();
  const { requestApi } = useContext(ApiContext);
  const classes = useStylesAgrega();
  const { addToast } = useToasts();

  /**
   * Hook usado para actualizar el estado de checked correctamente cuando obtenemos de la api su valor real.  
   */  
  useEffect(() => {
    item?.tipoPersona === 'F'? setTipoCheck(true): setTipoCheck(false);
  }, [item?.tipoPersona]);

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

  const adjustData = (data: Persona) => {
    //if(!data.ids_titulos_afectados) data.ids_titulos_afectados = [];
    data.idcd_personas = id;
    tipoCheck? data.tipo_persona = "F": data.tipo_persona = "M";
  } 

  const onSubmit = async (data: Persona) => {
    adjustData(data);
    const { success, message } = await requestApi(api.actualiza(data), setIsLoading);
    if(!success) return;
    addToast(message, { appearance: 'success'});
  };

  return (
    errorPage?
    (
      <NotFound errorMessage={`No existe la persona con id: ${id}`}/>)
    :(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {`Edita la persona: ${item.nombre || 'no encontrado'}`}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
            <TextField
            defaultValue={item.idcdPersonas}
            disabled
            label="Id persona"
            />
            <TextFieldCustom 
              required 
              autoFocus 
              label='Nombre' 
              register={register} 
              registerVar="nombre"
              defaultValue={item.nombre}
            />
            {errors.nombre && <Alert severity="warning">{errors.nombre.message}</Alert>}
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={tipoCheck} 
                    onChange={(e) => setTipoCheck(() => !tipoCheck)}
                    color="primary" />}
                label="Física"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={!tipoCheck} 
                    onChange={(e) => setTipoCheck(() => !tipoCheck)}
                    color="primary" />}
                label="Moral"
              />
            </FormGroup>
            {<Alert severity="warning">{'Falta la lista de ids afectados.'}</Alert>}
            <ButtonLoadingCustom label="Actualiza" isLoading={isLoading}/>
          </form>
        </div>
      </Container>
    )
  )
}