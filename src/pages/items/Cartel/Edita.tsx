import { CssBaseline, Typography, Container} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { lee, actualiza, baja } from "../../../api/cartel";
import { AgregaItemBase, BorraItemComponent, ButtonLoadingCustom, NotFound, TextFieldCustom } from "../../../components";
import { Cartel, Permisos } from "../../../types";
import { useStylesAgrega } from "../../styles";
import { urlPathItem } from "../../../utils";

const titlePage = "Edita Cartel";

export const Edita = (props: any) => {
  const { id } = props;
  const [ item, setItem ] = useState<any>(); 
  const [ itemHijo, setItemHijo ] = useState<any>(); 
  const { register, handleSubmit, formState: {errors} } = useForm<Cartel>();
  const [ isLoading, setIsLoading ] = useState(false);
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
    if(!data.cdItemCartel){ 
      addToast(`El item con id: [${id}] no es del tipo Foto Rodaje.`, {appearance: 'error'});
      return;
    }

    setItem(data);
    setItemHijo(data.cdItemCartel);
    setErrorPage(false);
  }; 

  const prepareData = (data: Cartel) => {
    data.idcd_item = id;
    //data.tipo_item = "foro";
  }

  const onSubmit = async (data: Cartel) => {
    prepareData(data);
    console.log(data);
    const { success, message } = await requestApi(actualiza(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success'});
  };

  const EditaFotoComponente = () => (
    <div>
      <Typography component="h1" variant="subtitle2">
        Componente Cartel
      </Typography>
      <TextFieldCustom
        autoFocus
        register={register}
        registerVar="itemHijo.institucion"
        label="Institución"
        defaultValue={itemHijo.institucion}
      />
      <TextFieldCustom
        autoFocus
        register={register}
        registerVar="itemHijo.pais"
        label="País"
        defaultValue={itemHijo.pais}
      />
      <TextFieldCustom
        autoFocus
        register={register}
        registerVar="itemHijo.tama"
        label="Tamaño"
        defaultValue={itemHijo.tama}
      />
      <TextFieldCustom
        autoFocus
        register={register}
        registerVar="itemHijo.ejemplares"
        label="Ejemplares"
        defaultValue={itemHijo.ejemplares}
      />
      <TextFieldCustom
        autoFocus
        register={register}
        registerVar="itemHijo.diseniador"
        label="Diseñador"
        defaultValue={itemHijo.diseniador}
      />
      <TextFieldCustom
        autoFocus
        register={register}
        registerVar="itemHijo.tecnica"
        label="Técnica"
        defaultValue={itemHijo.tecnica}
      />
      <TextFieldCustom
        autoFocus
        register={register}
        registerVar="itemHijo.estado_fisico"
        label="Estado Físico"
        defaultValue={itemHijo.estadoFisico}
      />
      <TextFieldCustom
        autoFocus
        register={register}
        registerVar="itemHijo.car_consulta"
        label="Car Consulta"
        defaultValue={itemHijo.carConsulta}
      />
    </div>
  )

  return (
    errorPage?
    (<NotFound errorMessage={`No existe el foto rodaje con id: [${id}] o no es de tipo fotorodaje`}/>)
    :(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5"> Edita Foto Rodaje </Typography>
          <BorraItemComponent requieredPermission={[Permisos.CARTEL_BAJA]} itemType={urlPathItem.CARTEL} idItem={id} bajaApi={baja} />
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
            <AgregaItemBase isEditaComponent item={item} register={register} errors={errors} />
            <EditaFotoComponente/>
            <ButtonLoadingCustom isLoading={isLoading} label="Actualiza"/>
          </form>
        </div>
      </Container>
    )
  )
}