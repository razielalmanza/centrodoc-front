import { CssBaseline, Typography, Container, TextField} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { inserta } from "../../../api/vhs_dvd";
import { AgregaItemBase, ButtonLoadingCustom, SelectListComponent, TextFieldCustom, TimePickerComponent } from "../../../components";
import { Vhs_Dvd } from "../../../types";
import { useStylesAgrega } from "../../styles";
import { idiomasISO639Alpha2 } from "../../../resources/languages";
import TimeField from "react-simple-timefield";

const titlePage = "Agrega VHS / DVD";

export const Agrega = () => {
  useEffect(() => {
    document.title = titlePage;
  }, []);

  const classes = useStylesAgrega();
  const { addToast } = useToasts();
  const { register, handleSubmit, formState: {errors} } = useForm<Vhs_Dvd>();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ idioma, setIdioma ] = useState<string>('');
  const [ subtitulos, setSubtitulos ] = useState('');
  const [ intertitulos, setIntertitulos ] = useState('');
  const [ duracion, setDuracion ] = useState('00:00');

  const { requestApi } = useContext(ApiContext);

  const prepareData = (data: Vhs_Dvd) => {
    data.tipo_item = "vhs_dvd";
    data.itemHijo.idioma = idioma;
    data.itemHijo.subtitulos = subtitulos;
    data.itemHijo.intertitulos = intertitulos;
    data.itemHijo.duracion = duracion;
    console.log(duracion);
  }

  const onSubmit = async (data: Vhs_Dvd) => {
    prepareData(data);
    console.log(data);
    const { success, message } = await requestApi(inserta(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success'});
  };

  const AgregaVhsDvdComponente = (props: any) => (
    <form>
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.formato"
        label="Formato"
      />
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.color"
        label="Color"
      />
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.audio"
        label="Audio"
      />
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.norma"
        label="Norma"
      />
       <TimeField
        value={duracion}                      
        onChange={(event, value) => {setDuracion(value)}} 
        input={<TextField type="text" label="Duración" />}   
        colon=":"                          
        showSeconds                
      />
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.region"
        label="Región"
      />
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.pantalla"
        label="Pantalla"
      />
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.observaciones"
        label="Observaciones"
      />
      <TextFieldCustom
        register={register}
        registerVar="itemHijo.extras"
        label="Extras"
      />
    </form>)

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5"> Insertar VHS / DVD </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
          <AgregaItemBase register={register} errors={errors}/>
          <Typography component="h1" variant="subtitle2"> Componente VHS / DVD</Typography>
          <SelectListComponent 
            tipoSelect="Idioma"
            listValues={idiomasISO639Alpha2}
            setValor={setIdioma} />
          <SelectListComponent 
            tipoSelect="Subtitulos"
            listValues={idiomasISO639Alpha2}
            setValor={setSubtitulos} />
          <SelectListComponent 
            tipoSelect="Intertitulos"
            listValues={idiomasISO639Alpha2}
            setValor={setIntertitulos} />
          <AgregaVhsDvdComponente  />
          <ButtonLoadingCustom isLoading={isLoading} label="Agrega"/>
        </form>
      </div>
    </Container>
  )
}