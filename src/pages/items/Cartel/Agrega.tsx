import { CssBaseline, Typography, Container} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { inserta } from "../../../api/cartel";
import { AgregaItemBase, ButtonLoadingCustom, TextFieldCustom } from "../../../components";
import { Cartel } from "../../../types";
import { useStylesAgrega } from "../../styles";

const titlePage = "Agrega Cartel";

export const Agrega = () => {
  useEffect(() => {
    document.title = titlePage;
  }, []);

  const classes = useStylesAgrega();
  const { addToast } = useToasts();
  const { register, handleSubmit, formState: {errors} } = useForm<Cartel>();
  const [ isLoading, setIsLoading ] = useState(false);
  const { requestApi } = useContext(ApiContext);

  const prepareData = (data: Cartel) => {
    data.tipo_item = "foro";
  }

  const onSubmit = async (data: Cartel) => {
    prepareData(data);
    console.log(data);
    const { success, message } = await requestApi(inserta(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success'});
  };

  const AgregaCartelComponente = () => (
    <div>
      <Typography component="h1" variant="subtitle2">
      Componente Cartel
      </Typography>
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.institucion"
        label="Institución"
      />
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.pais"
        label="País"
      />
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.tama"
        label="Tamaño"
      />
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.ejemplares"
        label="Ejemplares"
      />
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.diseniador"
        label="Diseñador"
      />
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.tecnica"
        label="Técnica"
      />
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.estado_fisico"
        label="Estado Físico"
      />
    </div>
  )

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5"> Insertar Cartel </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
          <AgregaItemBase register={register} errors={errors}/>
          <AgregaCartelComponente />
          <ButtonLoadingCustom isLoading={isLoading} label="Agrega"/>
        </form>
      </div>
    </Container>
  )
}