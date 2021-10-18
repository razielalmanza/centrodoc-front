import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import * as api from "../../../api/titulos";
import { calculatePage } from "../../../utils";
import { Pagination } from "@material-ui/lab";
import { ButtonLoadingCustom } from "../../../components";
import { ApiContext } from "../../../context";

interface BuscaComponentProps {
  open: boolean;
  setOpen: any;
  setValue: any;
  handleSelection: any;
}

/**
 * Similar a BuscaAsocia de Personas pero sin manejar listas.
 */
export const BuscaComponent = (props: BuscaComponentProps) => {
  const { open, setOpen, setValue, handleSelection } = props;
  const [ busqueda, setBusqueda ] = useState<string>();
  const [ resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [ page, setPage ] = useState<number>(1);
  const [ count, setCount ] = useState<number>(0);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const { requestApi } = useContext(ApiContext);
  const { addToast } = useToasts();
  const pageSize: number = 5;
  
  const handleClose = () => {
    setOpen(false);
  };

  const prepareQuery = (busqueda: string) => {
    return `titulo_original=${busqueda}`; 
  }

  // loading, array de params, function de api,
  const onSubmit = async () => {
    console.log(busqueda);
    if(!busqueda) return;
    if(busqueda.length < 4 ) {
      addToast(`La cadena '${busqueda}' es muy corta`, { appearance: 'warning'});
      return;
    }
    const query = prepareQuery(busqueda);
    const pagina = calculatePage(pageSize, page);
    const { data, count, success } = await requestApi(api.busca(query, pagina), setIsLoading);
    if(!success) return;
    if(data.length === 0){ 
      addToast(`No hay resultados para busqueda: ${busqueda}`, { appearance: 'info'});
      return;
    }
    setCount(count);
    setResultadosBusqueda(data);
  }

  const handleClick = (id: string) => {
    setValue('idcd_cat_titulos', id);
    handleSelection();
  } 


  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    onSubmit();
  }, [page]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Buscar Títulos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Busque títulos y dé click en el resultado deseado.
          </DialogContentText>
          <TextField
            required
            onChange={(e) => setBusqueda(e.target.value)}
            autoFocus
            label="Buscar título"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
          <ButtonLoadingCustom isLoading={isLoading} onClick={onSubmit} label="Buscar"/>
        </DialogActions>
        {
        resultadosBusqueda.map((e, index) => (
          <Button 
            key={index} 
            onClick={() => handleClick(e['idcdCatTitulos'])}
            >
            {`Título: ${e['tituloOriginal']}, ${e['anio']} | Id: ${e['idcdCatTitulos']}`} 
          </Button>
        ))}
        <Pagination 
          count={Math.ceil(count/pageSize)} 
          color="primary" 
          size="large"
          page={page} 
          onChange={handleChangePage} 
        />
      </Dialog>
    </div>
  )
}