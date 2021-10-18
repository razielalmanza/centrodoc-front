import { CssBaseline, Typography, Container, List, IconButton, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { AsociaItem } from "../../../types";
import { useStylesAgrega } from "../../styles";
import * as api from "../../../api/titulos";
import { ButtonLoadingCustom, SelectLoadComponent, TextFieldCustom } from "../../../components";
import { Alert } from "@material-ui/lab";
import AddIcon from '@material-ui/icons/Add';
import { BuscaComponent } from "./BuscaAsocia";
import { ApiContext } from "../../../context";

const titlePage = "Asocia Títiulos a Items";

interface IProps {
  defaultId?: string;
}

export const Asocia = (props: IProps) => {
  const { defaultId } = props;
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<AsociaItem>();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ openSearch, setOpenSearch ] = useState<boolean>(false);
  const { requestApi } = useContext(ApiContext);
  const { addToast } = useToasts();
  const classes = useStylesAgrega();
  
  useEffect(() => {
    if(!defaultId)
      addToast('No se ha dado id del item por defecto.', {appearance: 'info'});
    document.title = titlePage;
  }, []);


  const handleClickButtonAdd = () => {
    setOpenSearch(true);
  }

  const handleSelection = () => {
    console.log(getValues('idcd_cat_titulos'));
    setOpenSearch(false);
  }

  const onSubmit = async (data: AsociaItem) => {
    console.log(data);
    const { success, message } = await requestApi(api.asociaItem(data), setIsLoading);
    console.log(message, success);
    if(!success) return;
    addToast(message, { appearance: 'success'});
  };

   return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {'Asocia Título a Item'}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
        {!defaultId && <Alert severity="warning">Para obtener el ID del Item, puedes hacer una búsqueda del item y asociar títulos desde ahí.</Alert>}
          <TextFieldCustom
            required
            autoFocus
            register={register}
            registerVar="idcd_item"
            label="Id Item"
            type="number"
            defaultValue={defaultId}
          />
          {errors.idcd_item && <Alert severity="warning">{errors.idcd_item.message}</Alert>}
          <Typography  variant="subtitle2">
          {`Título a asociar:`}
          </Typography>
          <TextFieldCustom
            autoFocus
            disabled
            required
            register={register}
            registerVar="idcd_cat_titulos"
            label={`Id título ${getValues('idcd_cat_titulos')}` }
            defaultValue={getValues('idcd_cat_titulos')}
          />
          {errors.idcd_cat_titulos && <Alert severity="error">{errors.idcd_cat_titulos.message}</Alert>}
          <IconButton onClick={handleClickButtonAdd}>
            <AddIcon/>
          </IconButton>
          <ButtonLoadingCustom 
            isLoading={isLoading} 
            label='Asocia'
            />
        </form>
        <BuscaComponent 
          open={openSearch} 
          setOpen={setOpenSearch} 
          setValue={setValue}
          handleSelection={handleSelection}
        />
      </div>
    </Container>
  )
}