import { Container, Typography} from "@material-ui/core";
 import React, { useEffect, useState, useContext } from "react";
import { busca } from "../../../api/titulos";
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { ButtonLoadingCustom, ListResultsComponent, TextFieldCustom } from "../../../components";
import { Cartel } from "../../../types";
import { useForm } from "react-hook-form";
import { useStylesAgrega } from "../../styles";
import { Pagination } from "@material-ui/lab";
import { calculatePage } from "../../../utils";

export const Busca = (props: any) => {
  const [ busqueda, setBusqueda ] = useState<any>();
  const [ queryConsulted, setQueryConsulted ] = useState<any>();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [ page, setPage ] = useState<number>(1);
  const [ count, setCount ] = useState<number>(0);
  const { requestApi } = useContext(ApiContext);
  const pageSize: number = 10; 
  const { addToast } = useToasts();

  useEffect(() => {
    document.title = 'Busca Carteles'; 
  }, []);

  useEffect(() => {
    search(busqueda);
   }, [page]);

  const prepareData = (query: any) => {
    console.log(query);
    let armada: string = '';
    Object.keys(query).map((key) => {
      console.log(query[key]);
      if(query[key]?.length > 1)
        armada += `${key}=${query[key]}&`;
      //else
      //addToast(`Campo ${key} debe tener al menos 3 caracteres, se omite`, {appearance: 'warning'})
    })

    return armada; 
  }

  const displayQuery = (query: any) => {
    let armada: string = '';
    Object.keys(query).map((key) => {
      //console.log(query[key]);
      if(query[key]?.length > 1)
        armada += `${key}: ${query[key]}, `;
    })
    return armada; 
  }

  const onSubmit = (data: any) => {
    if(busqueda !== data) setBusqueda(data);
    setQueryConsulted(displayQuery(data));
    search(data);
  }

  const search = async (dataToSearch: any) => {
    const queryArmada = prepareData(dataToSearch);
    console.log(queryArmada);
    if (queryArmada.length === 0){
      addToast(`Búsqueda vacía o parametros muy cortos.`, {appearance: 'warning'});
      return;
    } 

    const pagina = calculatePage(pageSize, page);
    const { success, data, count } = await requestApi(busca(queryArmada, pagina), setIsLoading);
    if(!success) return;
    if(data.length === 0){
      addToast(`No hay resultados para la búsqueda`, { appearance: 'info'});
      return;
    }

    setCount(count);
    setResultadosBusqueda(data);
  };

  const AvanzadaComponente = (props: any) => {
    const { onSubmit } = props;
    const { register, handleSubmit } = useForm<Cartel>();

    const handleSubmitInterno = (data: any) => {
      onSubmit(data);
    }
    const classes = useStylesAgrega();
    return (
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Búsqueda Avanzada de Título
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(handleSubmitInterno)} >
          <TextFieldCustom
            register={register}
            registerVar="titulo_original"
            label="Título Original"
            minLength={5}
            autoFocus
          />
          <TextFieldCustom
            register={register}
            registerVar="titulo_en_espa"
            label="Título en español"
            minLength={5}
          />
          <TextFieldCustom
            register={register}
            registerVar="anio"
            label="Año"
            type="number"
          />
          <TextFieldCustom
            register={register}
            registerVar="anio_fin"
            label="Año fin"
            type="number"
          />
          <TextFieldCustom
            register={register}
            registerVar="pais_de_realizacion"
            label="País de realización"
            minLength={2}
          />
          <ButtonLoadingCustom isLoading={isLoading} label="Busca"/>
        </form>
    </div>
   )
  }
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <Container component="main" maxWidth="xl">
      <AvanzadaComponente onSubmit={onSubmit}/>
      {resultadosBusqueda && 
        <ListResultsComponent 
        resultados={resultadosBusqueda}
        idRedirect="idcdCatTitulos"
        displayValues={[{valueName: 'Título original', value: 'tituloOriginal'}, {valueName: 'Año', value: 'anio'}]} 
        itemId='titulos'
        count={count}
        query={queryConsulted}
      />}
      <Pagination 
        count={Math.ceil(count/pageSize)} 
        color="primary" 
        size="large"
        page={page} 
        onChange={handleChangePage} 
      />
    </Container>
  )
}