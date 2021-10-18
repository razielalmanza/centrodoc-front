import { CssBaseline, Typography, Container} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { inserta } from "../../../api/foto";
import { AgregaItemBase, ButtonLoadingCustom, TextFieldCustom } from "../../../components";
import { Foto } from "../../../types";
import { useStylesAgrega } from "../../styles";

const titlePage = "Agrega Foto Rodaje";

export const Agrega = () => {
  useEffect(() => {
    document.title = titlePage;
  }, []);

  const classes = useStylesAgrega();
  const { addToast } = useToasts();
  const { register, handleSubmit, formState: {errors} } = useForm<Foto>();
  const [ isLoading, setIsLoading ] = useState(false);
  const { requestApi } = useContext(ApiContext);

  const prepareData = (data: Foto) => {
    data.tipo_item = "foro";
  }

  const onSubmit = async (data: Foto) => {
    prepareData(data);
    console.log(data);
    const { success, message } = await requestApi(inserta(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success'});
  };

  const AgregaFotoComponente = () => (
    <div>
      <Typography component="h1" variant="subtitle2">
      Componente Foto Montaje
      </Typography>
      <TextFieldCustom
        required
        register={register}
        registerVar="itemHijo.tama"
        label="Tamaño"
      />
      <TextFieldCustom
        required
        register={register}
        registerVar="itemHijo.color"
        label="Color"
      />
    </div>
  )

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5"> Insertar Foto Montaje </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
          <AgregaItemBase register={register} errors={errors}/>
          <AgregaFotoComponente />
          <ButtonLoadingCustom isLoading={isLoading} label="Agrega"/>
        </form>
      </div>
    </Container>
  )
}