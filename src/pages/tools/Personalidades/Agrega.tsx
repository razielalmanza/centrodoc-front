import { CssBaseline, Typography, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { inserta } from "../../../api/personalidades";
import { TextFieldCustom, ButtonLoadingCustom } from "../../../components";
import { Personalidad } from "../../../types";
import { useStylesAgrega } from "../../styles";

const titlePage = "Agrega Personalidad";

export const Agrega = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<Personalidad>();
  const [ isLoading, setIsLoading ] = useState(false);
  const { requestApi } = useContext(ApiContext);
  const classes = useStylesAgrega();
  const { addToast } = useToasts();

  useEffect(() => {
    document.title = titlePage;
  }, []);

  /**
   * Se crea con la intención de dar formato correcto al json antes de enviarlo.
   * Usado en caso de enviar listas vacías necesarias, o campos de string como Number
   * @param data 
   */
  const adjustData = (data: Personalidad) => {
    if(!data.listaItems) data.listaItems = [];
    data.a_r_acervo_repetido = Number(data.a_r_acervo_repetido);
  } 

  const onSubmit = async (data: Personalidad) => {
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
          Insertar Personalidad
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
          <TextFieldCustom 
            required 
            autoFocus 
            label='Nombre artístico' 
            register={register} 
            registerVar="nombre_artistico" 
          />
          {errors.nombre_artistico && <Alert severity="warning">{errors.nombre_artistico.message}</Alert>}
          <TextFieldCustom
            label="Nombre verdadero"
            register={register}
            registerVar="nombre_verdadero"
          />
          <TextFieldCustom
            label="Sobrenombre"
            register={register}
            registerVar="sobrenombre"
          />
          <TextFieldCustom
            label="a_r_acervo_repetido"
            type="number" 
            register={register}
            registerVar="a_r_acervo_repetido"
          />
          <ButtonLoadingCustom label="Agrega" isLoading={isLoading}/>
        </form>
      </div>
    </Container>
  )
}