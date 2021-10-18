import { CssBaseline, Typography, Container } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { Interprete} from "../../../types";
import { useStylesAgrega } from "../../styles";
import { lee, actualiza } from "../../../api/interpretes";
import { ButtonLoadingCustom, NotFound, TextFieldCustom } from "../../../components";
import { Alert } from "@material-ui/lab";

const titlePage = "Edita Interprete";

export const Edita = (props: any) => {
  const { nombre } = props; 
  const [ item, setItem ] = useState<Interprete>(new Interprete()); 
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ errorPage, setErrorPage ] = useState<boolean>(true);
  const { register, handleSubmit, formState: {errors}} = useForm<Interprete>();
  const { requestApi } = useContext(ApiContext);
  const classes = useStylesAgrega();
  const { addToast } = useToasts();

  const fetchData = async () => {
    const {success, data } = await requestApi(lee(nombre));
    //console.log(request);
    if(!success) return;
    setItem(data);
    setErrorPage(false);
  }; 
  useEffect(() =>  {
    document.title = titlePage;
    //setItem({nombre: 'rax', cdTransItemInterpretes: []});
    fetchData();
  },[]);

  const onSubmit = async (data: Interprete) => {
    console.log(data);
    const { success, message } = await requestApi(actualiza(nombre, data), setIsLoading);
    if(!success) return;
    addToast(message, { appearance: 'success'});
  };

  return (
    errorPage?
    (
      <NotFound errorMessage={`No existe el interprete: ${nombre}`}/>)
    :(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {`Edita al interpretete: ${item.nombre || 'no encontrado'}`}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
            <TextFieldCustom
              required
              defaultValue={item.nombre}
              label="Nuevo nombre"
              register={register}
              registerVar="nombre"
              autoFocus
            />
            {errors.nombre && <Alert severity='warning'>{errors.nombre.message}</Alert>}
           <ButtonLoadingCustom isLoading={isLoading} label="Actualiza"/>
          </form>
        </div>
      </Container>
    )
  )
}