import { Container, CircularProgress} from "@material-ui/core";
 import React, { useEffect, useState, useContext } from "react";
import { busca } from "../../../api/personalidades";
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import { ListResultsComponent } from "../../../components";
import { calculatePage } from "../../../utils";
import { Pagination } from "@material-ui/lab";

export const Busca = (props: any) => {
  const { query } = props;
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [ page, setPage ] = useState<number>(1);
  const [ count, setCount ] = useState<number>(0);
  const { requestApi } = useContext(ApiContext);
  const pageSize: number = 10; 
  const { addToast } = useToasts();
  const MIN_SIZE_SEARCH: number = Number(process.env.REACT_APP_MIN_SIZE_SEARCH);

  useEffect(() => {
    if(!query) addToast('No se ha introducido busqueda.');
    else onSubmit(query);
  }, [page]);

  useEffect(() => {
    document.title = 'Busca Personalidad';
  }, []);
 
  const onSubmit = async (query: string) => {
    if(query.length < MIN_SIZE_SEARCH) {
      addToast(`La cadena '${query}' es muy corta`, { appearance: 'warning'});
      return;
    }
    const pagina = calculatePage(pageSize, page);
    const { success, data, count } = await requestApi(busca(query, pagina), setIsLoading);
    if(!success) return;
    console.log(data);
    if(data.length === 0){
      addToast(`No hay resultados para busqueda: ${query}`, { appearance: 'info'});
      return;
    }
    setCount(count);
    setResultadosBusqueda(data);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container component="main" maxWidth="xl">
      {isLoading && <CircularProgress/>}
      {resultadosBusqueda && 
        <ListResultsComponent 
          resultados={resultadosBusqueda} 
          idRedirect='idcdCatPersonalidades'
          displayValues= { [ { valueName: 'Sobrenombre', value: 'sobrenombre'}, {valueName: 'Nombre artistico', value: 'nombreArtistico'}] }
          query={query}
          itemId='personalidades'
          count={count}
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