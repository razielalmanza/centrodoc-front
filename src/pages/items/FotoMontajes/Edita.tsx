import { CssBaseline, Typography, Container} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { lee, actualiza, baja } from "../../../api/fomo";
import { AgregaItemBase, BorraItemComponent, ButtonLoadingCustom, NotFound, TextFieldCustom } from "../../../components";
import { Fomo, Permisos } from "../../../types";
import { useStylesAgrega } from "../../styles";
import { urlPathItem } from "../../../utils";

const titlePage = "Edita Fotomontaje";

export const Edita = (props: any) => {
  const { id } = props;
  const [ item, setItem ] = useState<any>(); 
  const [ itemHijo, setItemHijo ] = useState<any>(); 
  const { register, handleSubmit, formState: {errors} } = useForm<Fomo>();
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
    if(!data.cdItemFotomontajes){ 
      addToast(`El item con id: [${id}] no es del tipo Fotomontaje.`, {appearance: 'error'});
      return;
    }

    setItem(data);
    setItemHijo(data.cdItemFotomontajes);
    setErrorPage(false);
  }; 
 

  const prepareData = (data: Fomo) => {
    data.idcd_item = id;
    //data.tipo_item = "fomo";
  }

  const onSubmit = async (data: Fomo) => {
    prepareData(data);
    console.log(data);
    const { success, message } = await requestApi(actualiza(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success'});
  };

  const EditaFomoComponente = () => (
    <div>
      <Typography component="h1" variant="subtitle2">
        Componente Fotomontaje
      </Typography>
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
        registerVar="itemHijo.pais"
        label="País"
        defaultValue={itemHijo.pais}
      />
    </div>
  )

  return (
    errorPage?
    (<NotFound errorMessage={`No existe el fotomontaje con id: [${id}] o no es de tipo fomo`}/>)
    :(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5"> Edita Fotomontaje </Typography>
          <BorraItemComponent requieredPermission={[Permisos.FOMO_BAJA]} itemType={urlPathItem.FOMO} idItem={id} bajaApi={baja} />
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
            <AgregaItemBase isEditaComponent item={item} register={register} errors={errors} />
            <EditaFomoComponente/>
            <ButtonLoadingCustom isLoading={isLoading} label="Actualiza"/>
          </form>
        </div>
      </Container>
    )
  )
}