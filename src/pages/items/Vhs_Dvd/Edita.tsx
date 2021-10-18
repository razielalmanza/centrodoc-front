import { CssBaseline, Typography, Container, TextField} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { lee, actualiza, baja } from "../../../api/vhs_dvd";
import { AgregaItemBase, BorraItemComponent, ButtonLoadingCustom, NotFound, SelectListComponent, TextFieldCustom } from "../../../components";
import { Permisos, Vhs_Dvd } from "../../../types";
import { useStylesAgrega } from "../../styles";
import { urlPathItem } from "../../../utils";
import { idiomasISO639Alpha2 } from "../../../resources/languages";
import TimeField from "react-simple-timefield";

const titlePage = "Edita Vhs / Dvd";

export const Edita = (props: any) => {
  const { id } = props;
  const [ item, setItem ] = useState<any>(); 
  const [ itemHijo, setItemHijo ] = useState<any>(); 
  const { register, handleSubmit, formState: {errors} } = useForm<Vhs_Dvd>();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ idioma, setIdioma ] = useState<string>('');
  const [ subtitulos, setSubtitulos ] = useState('');
  const [ intertitulos, setIntertitulos ] = useState('');
  const [ duracion, setDuracion ] = useState('00:00');

  const { requestApi } = useContext(ApiContext);
  const [ errorPage, setErrorPage ] = useState<boolean>(true);
  const { addToast } = useToasts();
  const classes = useStylesAgrega();

  useEffect(() =>  {
    document.title = titlePage;
    fetchData();
  },[]);

  const fetchData = async () => {
    const { success, data } = await requestApi(lee(id));
    console.log(success, data);
    if(!success) return;
    if(!data.cdVhsDvd){ 
      addToast(`El item con id: [${id}] no es del tipo VHS / DVD.`, {appearance: 'error'});
      return;
    }

    setItem(data);
    setItemHijo(data.cdVhsDvd);
    setErrorPage(false);
  }; 

  const prepareData = (data: Vhs_Dvd) => {
    data.idcd_item = id;
    data.itemHijo.idioma = idioma;
    data.itemHijo.subtitulos = subtitulos;
    data.itemHijo.intertitulos = intertitulos;
    data.itemHijo.duracion = duracion;
    //data.tipo_item = "foro";
  }

  const onSubmit = async (data: Vhs_Dvd) => {
    prepareData(data);
    console.log(data);
    const { success, message } = await requestApi(actualiza(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success'});
  };

  const EditaFotoComponente = () => (
    <div>
      <TextFieldCustom
        autoFocus
        register={register}
        registerVar="itemHijo.formato"
        label="Formato"
        defaultValue={itemHijo.formaro}
      />
      <TextFieldCustom
        autoFocus
        defaultValue={itemHijo.color}
        register={register}
        registerVar="itemHijo.color"
        label="Color"
      />
      <TextFieldCustom
        autoFocus
        defaultValue={itemHijo.audio}
        register={register}
        registerVar="itemHijo.audio"
        label="Audio"
      />
      <TextFieldCustom
        autoFocus
        defaultValue={itemHijo.norma}
        register={register}
        registerVar="itemHijo.norma"
        label="Norma"
      />
      <TimeField
        value={itemHijo.duracion}                     
        onChange={(event, value) => {setDuracion(value)}} 
        input={<TextField type="text" label="Duración"  />}   
        colon=":"                          
        showSeconds                
      />
      <TextFieldCustom
        autoFocus
        defaultValue={itemHijo.region}
        register={register}
        registerVar="itemHijo.region"
        label="Región"
      />
      <TextFieldCustom
        autoFocus
        defaultValue={itemHijo.pantalla}
        register={register}
        registerVar="itemHijo.pantalla"
        label="Pantalla"
      />
      <TextFieldCustom
        autoFocus
        defaultValue={itemHijo.observaciones}
        register={register}
        registerVar="itemHijo.observaciones"
        label="Observaciones"
      />
      <TextFieldCustom
        autoFocus
        defaultValue={itemHijo.extras}
        register={register}
        registerVar="itemHijo.extras"
        label="Extras"
      />
    </div>
  )

  return (
    errorPage?
    (<NotFound errorMessage={`No existe el VHS / DVD con id: [${id}] o no es de tipo vhs `}/>)
    :(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5"> Edita VHS / DVD </Typography>
          <BorraItemComponent requieredPermission={[Permisos.UNICA_BAJA]} itemType={urlPathItem.VHSDVD} idItem={id} bajaApi={baja} />
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
            <AgregaItemBase isEditaComponent item={item} register={register} errors={errors} />
            <Typography component="h1" variant="subtitle2"> Componente VHS / DVD</Typography>
            <SelectListComponent 
              tipoSelect="Idioma"
              listValues={idiomasISO639Alpha2}
              setValor={setIdioma} 
              isEdita
              defaultValue={itemHijo.idioma}/>
            <SelectListComponent 
              tipoSelect="Subtitulos"
              listValues={idiomasISO639Alpha2}
              setValor={setSubtitulos}
              isEdita
              defaultValue={itemHijo.subtitulos} />
            <SelectListComponent 
              tipoSelect="Intertitulos"
              listValues={idiomasISO639Alpha2}
              setValor={setIntertitulos}
              isEdita
              defaultValue={itemHijo.intertitulos} />
            <EditaFotoComponente/>
            <ButtonLoadingCustom isLoading={isLoading} label="Actualiza"/>
          </form>
        </div>
      </Container>
    )
  )
}