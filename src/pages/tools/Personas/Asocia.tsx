import { CssBaseline, Typography, Container, List, IconButton, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { AsociaPersona } from "../../../types";
import { useStylesAgrega } from "../../styles";
import * as api from "../../../api/personas";
import { ButtonLoadingCustom, SelectLoadComponent, TextFieldCustom } from "../../../components";
import { Alert } from "@material-ui/lab";
import AddIcon from '@material-ui/icons/Add';
import { BuscaComponent } from "./BuscaAsocia";
import { ApiContext } from "../../../context";

const titlePage = "Asocia Títiulo";
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
  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<AsociaPersona>();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ listaRelaciones, setListaRelaciones ] = useState<number[]>([]);
  const [ apiRequest, setApiRequest ] = useState<any>();
  const [ openSearch, setOpenSearch ] = useState<boolean>(false);
  const { requestApi } = useContext(ApiContext);
  const { addToast } = useToasts();
  const classes = useStylesAgrega();
  
  useEffect(() => {
    if(!defaultId)
      addToast('No se ha dado id del título por defecto.', {appearance: 'info'});
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

  // const prepareData = (data: AsociaPersona) => {
  //   const cleanedList = data.lista_relaciones.filter(e => e.rol && e.idcd_personas);
  //    data.lista_raelaciones = cleanedList;
  //  }

  const onSubmit = async (data: AsociaPersona) => {
    //prepareData(data);
    console.log(data);
    const {success, message } = await requestApi(apiRequest(data), setIsLoading);
    console.log(message, success);
    if(!success) return;
    addToast(message, { appearance: 'success'});
  };

   return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {desasociaComponent? 'Desasocia personas de Título': 'Asocia personas a Título'}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
        {!defaultId && <Alert severity="warning">Para obtener el ID del titulo, puedes hacer una búsqueda del título y obtener el ID.</Alert>}
          <TextFieldCustom
            required
            autoFocus
            register={register}
            registerVar="idcd_cat_titulos"
            label="Id Títulos"
            type="number"
            defaultValue={defaultId}
            disabled={defaultId? true: false}
          />
          {errors.idcd_cat_titulos && <Alert severity="warning">{errors.idcd_cat_titulos.message}</Alert>}
          <Typography  variant="subtitle2">
          {`Personas a ${desasociaComponent? 'des': ''}asociar:`}
          </Typography>
          <List>
            {
              listaRelaciones?.map((value, index: number) => (
                <div key={index}>
                  <TextField
                    autoFocus
                    disabled
                    label={`Persona Id: ${index+1}`}
                    defaultValue={getValues('lista_relaciones')[index]['idcd_personas']}
                  />
                  <TextField
                    autoFocus
                    disabled
                    label={`Persona Nombre: ${index+1}`}
                    defaultValue={getValues('lista_relaciones')[index]['nombre']}
                  />
                  {!desasociaComponent && <TextField
                    required
                    autoFocus
                    disabled
                    label={`Rol Persona ${index+1} en título:`}
                    defaultValue={getValues('lista_relaciones')[index]['rol']}
                  />
                  }
                  {desasociaComponent && 
                    <SelectLoadComponent
                      register={register}
                      registerVar={`lista_relaciones.${index}.rol`}
                      idTitulo={getValues('idcd_cat_titulos')}
                      idPersona={getValues('lista_relaciones')[index]['idcd_personas']}
                    />
                  }
                </div>
              ))
            }
          </List>
          {errors.lista_relaciones && <Alert severity="error">{'Ups. Algo está vacío. No se puede continuar'}</Alert>}
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
          desasociaComponent={desasociaComponent}
        />
      </div>
    </Container>
  )
}