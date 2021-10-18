import { CssBaseline, Typography, Container} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { inserta } from "../../../api/fomo";
import { AgregaItemBase, ButtonLoadingCustom, TextFieldCustom } from "../../../components";
import { Fomo } from "../../../types";
import { useStylesAgrega } from "../../styles";

const titlePage = "Agrega Fotomontaje";

export const Agrega = () => {
  useEffect(() => {
    document.title = titlePage;
  }, []);

  const classes = useStylesAgrega();
  const { addToast } = useToasts();
  const { register, handleSubmit, formState: {errors} } = useForm<Fomo>();
  const [ isLoading, setIsLoading ] = useState(false);
  const { requestApi } = useContext(ApiContext);

  const prepareData = (data: Fomo) => {
    data.tipo_item = "fomo";
  }

  const onSubmit = async (data: Fomo) => {
    prepareData(data);
    console.log(data);
    const { success, message } = await requestApi(inserta(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success'});
  };

  const AgregaFomoComponente = () => (
    <div>
      <Typography component="h1" variant="subtitle2">
      Componente Fotomontaje
      </Typography>
      <TextFieldCustom
        required
        register={register}
        registerVar="itemHijo.ejemplares"
        label="Ejemplares"
      />
      <TextFieldCustom
        required
        register={register}
        registerVar="itemHijo.pais"
        label="País"
      />
    </div>
  )

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5"> Insertar Fotomontaje </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
          <AgregaItemBase register={register} errors={errors}/>
          <AgregaFomoComponente />
          <ButtonLoadingCustom isLoading={isLoading} label="Agrega"/>
        </form>
      </div>
    </Container>
  )
}