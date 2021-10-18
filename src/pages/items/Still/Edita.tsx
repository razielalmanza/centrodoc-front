import { CssBaseline, Typography, Container} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { lee, actualiza, baja } from "../../../api/still";
import { AgregaItemBase, BorraItemComponent, ButtonLoadingCustom, NotFound, TextFieldCustom } from "../../../components";
import { Permisos, Still } from "../../../types";
import { useStylesAgrega } from "../../styles";
import { urlPathItem } from "../../../utils";

const titlePage = "Edita Still";

export const Edita = (props: any) => {
  const { id } = props;
  const [ item, setItem ] = useState<any>(); 
  const [ itemHijo, setItemHijo ] = useState<any>(); 
  const { register, handleSubmit, formState: {errors} } = useForm<Still>();
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
    if(!data.cdItemStills){ 
      addToast(`El item con id: [${id}] no es del tipo Still.`, {appearance: 'error'});
      return;
    }
    setItem(data);
    setItemHijo(data.cdItemStills);
    setErrorPage(false);
  }; 
 

  const prepareData = (data: Still) => {
    data.idcd_item = id;
    //data.tipo_item = "still";
  }

  const onSubmit = async (data: Still) => {
    prepareData(data);
    console.log(data);
    const { success, message } = await requestApi(actualiza(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success'});
  };

  const EditaStillComponente = () => (
    <div>
      <Typography component="h1" variant="subtitle2">
        Componente Still
      </Typography>
      <TextFieldCustom
        autoFocus
        register={register}
        registerVar="itemHijo.a_r_"
        label="A R"
        type="number"
        defaultValue={itemHijo.aR}
      />
      {errors.itemHijo?.a_r_ && <Alert severity="warning">{errors.itemHijo?.a_r_.message}</Alert>}
      <TextFieldCustom
        autoFocus
        register={register}
        registerVar="itemHijo.a_f_total_ejemplares"
        label="A F Total Ejemplares"
        defaultValue={itemHijo.aFTotalEjemplares}
      />
      {errors.itemHijo?.a_f_total_ejemplares && <Alert severity="warning">{errors.itemHijo?.a_f_total_ejemplares.message}</Alert>}
    </div>
  )

  return (
    errorPage?
    (<NotFound errorMessage={`No existe el still con id: [${id}] o no es de tipo still`}/>)
    :(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Typography component="h1" variant="h5"> Edita Still </Typography>
          <BorraItemComponent requieredPermission={[Permisos.STILLS_BAJA]} itemType={urlPathItem.STILLS} idItem={id} bajaApi={baja} />
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
            <AgregaItemBase isEditaComponent item={item} register={register} errors={errors} />
            <EditaStillComponente/>
            <ButtonLoadingCustom isLoading={isLoading} label="Actualiza"/>
          </form>
        </div>
      </Container>
    )
  )
}