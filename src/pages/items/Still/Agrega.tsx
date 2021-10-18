import { CssBaseline, Typography, Container} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { inserta } from "../../../api/still";
import { AgregaItemBase, ButtonLoadingCustom, TextFieldCustom } from "../../../components";
import { Still } from "../../../types";
import { useStylesAgrega } from "../../styles";

const titlePage = "Agrega Still";

export const Agrega = () => {
  useEffect(() => {
    document.title = titlePage;
  }, []);

  const classes = useStylesAgrega();
  const { addToast } = useToasts();
  const { register, handleSubmit, formState: {errors} } = useForm<Still>();
  const [ isLoading, setIsLoading ] = useState(false);
  const { requestApi } = useContext(ApiContext);

  const prepareData = (data: Still) => {
    data.tipo_item = "still";
  }

  const onSubmit = async (data: Still) => {
    prepareData(data);
    console.log(data);
    const { success, message } = await requestApi(inserta(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success' });
  };

  const AgregaStillComponente = () => (
    <div>
      <Typography component="h1" variant="subtitle2">
      Componente Still
      </Typography>
      <TextFieldCustom
        required
        register={register}
        registerVar="itemHijo.a_r_"
        label="A R"
        type="number"
      />
      {errors.itemHijo?.a_r_ && <Alert severity="warning">{errors.itemHijo?.a_r_.message}</Alert>}
      <TextFieldCustom
        required
        register={register}
        registerVar="itemHijo.a_f_total_ejemplares"
        label="A F Total Ejemplares"
      />
      {errors.itemHijo?.a_f_total_ejemplares && <Alert severity="warning">{errors.itemHijo?.a_f_total_ejemplares.message}</Alert>}
    </div>
  )

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5"> Insertar Still </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
          <AgregaItemBase register={register} errors={errors}/>
          <AgregaStillComponente />
          <ButtonLoadingCustom isLoading={isLoading} label="Agrega"/>
        </form>
      </div>
    </Container>
  )
}