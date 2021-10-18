import { CssBaseline, Typography, Container, List, IconButton, TextField } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { AsociaInterp } from "../../../types";
import { useStylesAgrega } from "../../styles";
import * as api from "../../../api/interpretes";
import { ButtonLoadingCustom, TextFieldCustom } from "../../../components";
import { Alert } from "@material-ui/lab";
import AddIcon from '@material-ui/icons/Add';
import { BuscaComponent } from "./BuscaAsocia";

const titlePage = "Asocia Item";
interface IProps {
  defaultId?: number;
  desasociaComponent?: boolean;
}

/**
 * Se usa una lista mockup listaRelaciones donde dinamicamente se va creciendo según el usuario inserte personas.
 * Si es componente desasocia entonces se muestran los roles que se pueden quitar.
 * @param props 
 * @returns 
 */
export const Asocia = (props: IProps) => {
  const { defaultId, desasociaComponent = false } = props;
  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<AsociaInterp>();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ listaRelaciones, setListaRelaciones ] = useState<number[]>([]);
  const [ apiRequest, setApiRequest ] = useState<any>();
  const [ openSearch, setOpenSearch ] = useState<boolean>(false);
  const { requestApi } = useContext(ApiContext);
  const { addToast } = useToasts();
  const classes = useStylesAgrega();
  
  useEffect(() => {
    if(!defaultId)
      addToast('No se ha dado id del Interprete por defecto.', {appearance: 'info'});
      /** Setteamos la consulta al api que se hará según si es un asocia o desasocia */
    desasociaComponent? 
      setApiRequest(() => api.desasocia): 
      setApiRequest(() => api.asocia);
    document.title = titlePage;
  }, []);

  const handleAddField = () => {
    setOpenSearch(true);
  }

  const handleSelection = () => {
    setListaRelaciones([...listaRelaciones, 1]);
    setOpenSearch(false);
  }

  // const prepareData = (data: AsociaInterp) => {
  //   const cleanedList = data.lista_relaciones.filter(e => e.rol && e.idcd_personas);
  //    data.lista_relaciones = cleanedList;
  //  }

  const onSubmit = async (data: AsociaInterp) => {
    //prepareData(data);
    console.log(data);
    const { success, message } = await requestApi(apiRequest(data), setIsLoading);
    if(success)
      addToast(message, { appearance: 'success'});
  };

   return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {desasociaComponent? 'Desasocia Interpretes de Item': 'Asocia Interpretes a Item'}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
        {!defaultId && <Alert severity="warning">Para obtener el ID, puedes hacer una búsqueda del item y acceder a la opción de asociar desde ahí.</Alert>}
          <TextFieldCustom
            required
            autoFocus
            register={register}
            registerVar="idcd_item"
            label="Id Item"
            type="number"
            defaultValue={defaultId}
            disabled={defaultId? true: false}
          />
          {errors.idcd_item && <Alert severity="warning">{errors.idcd_item.message}</Alert>}
          <Typography variant="subtitle2">
            {`Interpretes a ${desasociaComponent? 'des': ''}asociar:`}
          </Typography>
          <List>
            {
              listaRelaciones?.map((value, index: number) => (
                <TextField 
                  key={index}
                  autoFocus
                  disabled
                  label={`Interprete: ${index+1}`}
                  defaultValue={getValues('listaInterpretes')[index]}
                />
              ))
            }
          </List>
          {errors.listaInterpretes && <Alert severity="error">{'Ups. Algo está vacío. No se puede continuar'}</Alert>}
          <IconButton onClick={handleAddField}>
            <AddIcon/>
          </IconButton>
          <ButtonLoadingCustom 
            isLoading={isLoading} 
            label={desasociaComponent? 'Desasocia': 'Asocia'}
            />
        </form>
        <BuscaComponent 
          open={openSearch} 
          setOpen={setOpenSearch} 
          index={listaRelaciones.length}
          setValue={setValue}
          handleSelection={handleSelection}
        />
      </div>
    </Container>
  )
}