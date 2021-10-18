import { CssBaseline, Typography, Container, TextField} from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { Personalidad} from "../../../types";
import { useStylesAgrega } from "../../styles";
import * as api from "../../../api/personalidades";
import { ButtonLoadingCustom, NotFound, TextFieldCustom } from "../../../components";
import { Alert } from "@material-ui/lab";

const titlePage = "Edita Personalidad";

export const Edita = (props: any) => {
  const { id } = props; 
  const [ item, setItem ] = useState<any>(); 
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ errorPage, setErrorPage ] = useState<boolean>(true);
  const { register, handleSubmit, formState: {errors}} = useForm<Personalidad>();
  const { requestApi } = useContext(ApiContext);
  const classes = useStylesAgrega();
  const { addToast } = useToasts();

  const fetchData = async () => {
    const { success, data } = await requestApi(api.lee(id));
    if(!success) return;
    setItem(data);
    setErrorPage(false);
  }; 

  useEffect(() =>  {
    document.title = titlePage;
    fetchData();
  },[]);

  const adjustData = (data: Personalidad) => {
    if(!data.listaItems) data.listaItems = [];
    data.a_r_acervo_repetido = Number(data.a_r_acervo_repetido);
    data.idcd_cat_personalidades = id;
  } 

  const onSubmit = async (data: Personalidad) => {
    adjustData(data);
    console.log(data);
    const { success, message } = await requestApi(api.actualiza(data), setIsLoading);
    if(!success) return;
    addToast(message, { appearance: 'success'});
  };

  return (
    errorPage?
    (
      <NotFound errorMessage={`No existe la personalidad con id: ${id}`}/>)
    :(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {`Edita la personalidad: ${item.nombreArtistico || 'no encontrado'}`}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
            <TextField
            defaultValue={item.idcdCatPersonalidades}
            disabled
            label="Id Personalidad"
            />
            <TextFieldCustom 
            required 
            autoFocus
            defaultValue={item.nombreArtistico}
            label='Nombre artístico' 
            register={register} 
            registerVar="nombre_artistico" 
            />
            {errors.nombre_artistico && <Alert severity="warning">{errors.nombre_artistico.message}</Alert>}
            <TextFieldCustom
              label="Nombre verdadero"
              register={register}
              registerVar="nombre_verdadero"
              defaultValue={item.nombreVerdadero}
              autoFocus
            />
            <TextFieldCustom
              label="Sobrenombre"
              register={register}
              registerVar="sobrenombre"
              defaultValue={item.sobrenombre}
              autoFocus
            />
            <TextFieldCustom
              label="a_r_acervo_repetido"
              type="number" 
              register={register}
              registerVar="a_r_acervo_repetido"
              defaultValue={item.aRAcervoRepetido}
              autoFocus
            />
            <ButtonLoadingCustom isLoading={isLoading} label="Actualiza"/>
          </form>
        </div>
      </Container>
    )
  )
}