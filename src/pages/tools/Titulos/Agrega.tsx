import { CssBaseline, Typography, Container, Checkbox, FormGroup, FormControlLabel} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { inserta } from "../../../api/titulos";
import { ButtonLoadingCustom, SelectListComponent, TextFieldCustom } from "../../../components";
import { Titulo } from "../../../types";
import { useStylesAgrega } from "../../styles";
import { paisesISOAlpha3 } from "../../../resources/countries";

const titlePage = "Agrega Título";

export const Agrega = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<Titulo>();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ circaCheck, setCircaCheck ] = useState<boolean>(false);
  const [ pais, setPais ] = useState<string>('');
  const { requestApi } = useContext(ApiContext);
  const classes = useStylesAgrega();
  const { addToast } = useToasts();

  useEffect(() => {
    document.title = titlePage;
  }, []);

  const adjustData = (data: Titulo) => {
    if(!data.listaPersonas) data.listaPersonas = [];
    if(!data.anio_fin) data.anio_fin = null;
    data.circa = circaCheck;
    data.pais_de_realizacion = pais;
    console.log(data);
  } 

  const onSubmit = async (data: Titulo) => {
    adjustData(data);
    const { success, message } = await requestApi(inserta(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success'});
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Insertar Titulo
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
          <TextFieldCustom
            required
            register={register}
            registerVar="titulo_original"
            label="Título Original"
            autoFocus
          />
          {errors.titulo_original && <Alert severity="warning">{errors.titulo_original.message}</Alert>}
          <TextFieldCustom
            required
            register={register}
            registerVar="titulo_en_espa"
            label="Título en español"
          />
          {errors.titulo_en_espa && <Alert severity="warning">{errors.titulo_en_espa.message}</Alert>}
          <TextFieldCustom
            required
            register={register}
            registerVar="anio"
            label="Año"
            type="number"
          />
          {errors.anio && <Alert severity="warning">{errors.anio.message}</Alert>}
          <TextFieldCustom
            register={register}
            registerVar="anio_fin"
            label="Año fin"
            type="number"
          />   
          <SelectListComponent
            tipoSelect="País de realización "
            setValor={setPais}
            listValues={paisesISOAlpha3}
            />
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={circaCheck} 
                  onChange={(e) => setCircaCheck(e.target.checked)}
                  color="primary" />}
              label="Circa"
            />
          </FormGroup>
          <ButtonLoadingCustom isLoading={isLoading} label="Agrega"/>
        </form>
      </div>
    </Container>
  )
}