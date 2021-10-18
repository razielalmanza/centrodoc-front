import { CssBaseline, Typography, Container, FormGroup, FormControlLabel, Checkbox, TextField } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { Titulo } from "../../../types";
import { useStylesAgrega } from "../../styles";
import * as api from "../../../api/titulos";
import { ButtonLoadingCustom, NotFound, SelectListComponent, TextFieldCustom } from "../../../components";
import { Alert } from "@material-ui/lab";
import { paisesISOAlpha3 } from "../../../resources/countries";

const titlePage = "Edita Título";

export const Edita = (props: any) => {
  const { id } = props; 
  const [ item, setItem ] = useState<any>(); 
  const [ circaCheck, setCircaCheck ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ errorPage, setErrorPage ] = useState<boolean>(true);
  const { register, handleSubmit, formState: {errors}, getValues } = useForm<Titulo >();
  const [ pais, setPais ] = useState<string>('');
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

  /**
   * Hook usado para actualizar el estado de checked correctamente cuando obtenemos de la api su valor real.  
   */  
  useEffect(() => {
    if (item)
      setCircaCheck(Boolean(item.circa.data[0]));
  }, [item?.circa]);

  const adjustData = (data: Titulo) => {
    //console.log(data);
    if(!data.listaPersonas) data.listaPersonas = [];
    if(!data.anio_fin) data.anio_fin = null;
    data.circa = circaCheck;
    data.idcd_cat_titulos = id;
    if(pais){
      data.pais_de_realizacion = pais;
    }else{
      data.pais_de_realizacion = item.paisDeRealizacion;
    }
    //console.log(data);
  } 

  const onSubmit = async (data: Titulo) => {
    adjustData(data);
    const { success, message } = await requestApi(api.actualiza(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success'});
  };

  return (
    errorPage?
    (
      <NotFound errorMessage={`No existe el título con id: ${id}`}/>)
    :(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {`Edita el título: ${item.tituloOriginal || 'no encontrado'}`}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
            <TextField
            defaultValue={item.idcdCatTitulos}
            disabled
            label="Id título"
            />
            <TextFieldCustom
              required
              register={register}
              registerVar="titulo_original"
              label="Título Original"
              defaultValue={item.tituloOriginal}
              autoFocus
              getValues={getValues}
            />
            <TextFieldCustom
              required
              register={register}
              registerVar="titulo_en_espa"
              label="Título en español"
              defaultValue={item.tituloEnEspa}
              autoFocus
              getValues={getValues}
            />
            {errors.titulo_en_espa && <Alert severity="warning">{errors.titulo_en_espa.message}</Alert> }
            <SelectListComponent 
            tipoSelect="País de realización"
              listValues={paisesISOAlpha3}
              defaultValue={item.paisDeRealizacion} 
              setValor={setPais} 
              isEdita/>
            <TextFieldCustom
            required
            register={register}
            registerVar="anio"
            label="Año"
            type="number"
            defaultValue={item.anio}
            autoFocus
            getValues={getValues}
          />
          {errors.anio && <Alert severity="warning">{errors.anio.message}</Alert> }
            <TextFieldCustom
              register={register}
              registerVar="anio_fin"
              label="Año fin"
              type="number"
              defaultValue={item.anioFin}
              autoFocus
              getValues={getValues}
            />
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={circaCheck}
                    onChange={ e => setCircaCheck(e.target.checked)}
                    color="primary" />}
                label={`Circa`}
              />
            </FormGroup>
            <ButtonLoadingCustom isLoading={isLoading} label="Actualiza"/>
          </form>
        </div>
      </Container>
    )
  )
}