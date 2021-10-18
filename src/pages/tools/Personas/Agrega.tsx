import { CssBaseline, Typography, Container, FormControlLabel, FormGroup, Checkbox } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { inserta } from "../../../api/personas";
import { TextFieldCustom, ButtonLoadingCustom } from "../../../components";
import { ApiContext } from "../../../context";
import { Persona } from "../../../types";
import { useStylesAgrega } from "../../styles";

const titlePage = "Agrega Persona";

export const Agrega = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<Persona>();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ tipoCheck, setTipoCheck ] = useState<boolean>(true);
  const { requestApi } = useContext(ApiContext);
  const classes = useStylesAgrega();
  const { addToast } = useToasts();

  useEffect(() => {
    document.title = titlePage;
  }, []);


  /**
   * Se crea con la intención de dar formato correcto al json antes de enviarlo.
   * Usado en caso de enviar listas vacía necesarias, o campos de string como Number
   * @param data 
   */
  const adjustData = (data: Persona) => {
    //if(!data.ids_titulos_afectados) data.ids_titulos_afectados = [];
    tipoCheck? data.tipo_persona = "F": data.tipo_persona = "M";
  } 

  const onSubmit = async (data: Persona) => {
    adjustData(data);
    console.log(data);
    const { success, message } = await requestApi(inserta(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success'});
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Insertar Persona
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
          <TextFieldCustom 
            required 
            autoFocus 
            label='Nombre' 
            register={register} 
            registerVar="nombre"
          />
          {errors.nombre && <Alert severity="warning">{errors.nombre.message}</Alert>}
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={tipoCheck} 
                  onChange={(e) => setTipoCheck( () => !tipoCheck)}
                  color="primary" />}
              label="Física"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={!tipoCheck} 
                  onChange={(e) => setTipoCheck( () => !tipoCheck)}
                  color="primary" />}
              label="Moral"
            />
          </FormGroup>
          {<Alert severity="warning">{'Falta la lista de ids afectados.'}</Alert>}
          <ButtonLoadingCustom label="Agrega" isLoading={isLoading}/>
        </form>
      </div>
    </Container>
  )
}