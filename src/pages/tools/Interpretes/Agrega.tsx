import { CssBaseline, Typography, Container} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { inserta } from "../../../api/interpretes";
import { ButtonLoadingCustom, TextFieldCustom } from "../../../components";
import { Interprete } from "../../../types";
import { useStylesAgrega } from "../../styles";

const titlePage = "Agrega Interprete";

export const Agrega = () => {
  useEffect(() => {
    document.title = titlePage;
  }, []);

  const classes = useStylesAgrega();
  const { addToast } = useToasts();
  const { register, handleSubmit, formState: {errors} } = useForm<Interprete>();
  const [ isLoading, setIsLoading ] = useState(false);
  const { requestApi } = useContext(ApiContext);

  const onSubmit = async (data: Interprete) => {
    const { success, message } = await requestApi(inserta(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success'});
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Insertar interprete
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
          <TextFieldCustom
            required
            register={register}
            registerVar="nombre"
            label="Nombre"
            autoFocus
          />
          {errors.nombre && <Alert severity="warning">{errors.nombre.message}</Alert>}
          <ButtonLoadingCustom isLoading={isLoading} label="Agrega"/>
        </form>
      </div>
    </Container>
  )
}