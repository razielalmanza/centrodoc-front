import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { ApiContext } from "../../../context";
import * as api from "../../../api/interpretes";
import { calculatePage } from "../../../utils";
import { Pagination } from "@material-ui/lab";
import { ButtonLoadingCustom } from "../../../components";

interface BuscaComponentProps {
  open: boolean;
  setOpen: any;
  index: number;    
  setValue: any;
  handleSelection: any;
}

/**
 * Componente secundario para dar al usuario una pantalla donde pueda buscar Personas y al elegir una, se muestre en la pantalla principal.
 * Esto se logra utilizando un setValue de un react-hook-forms, en el que se recibe el index, pues como lidiamos con listas de personas a añadir. 
 * Al lanzar este componente se manda el index actual de la lista, y es donde se guardarán los valores en la funcion handleClick() que es cuando un user selecciono una
 * Persona de la busqueda, en es handleClick también se manda a llamar el handleSelection que se recibe, donde se crea un elemnto extra en la list principal, y seteará
 * los inputs con los valores que acaban de ser ajustados en handleClick.
 * 
 * Tiene un componente de Busca completo: lista de resultados, y un Pagination. useEffect de page, etc.
 * @param props 
 * @returns 
 */
export const BuscaComponent = (props: BuscaComponentProps) => {
  const { open, setOpen, setValue, index, handleSelection} = props;
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

  const onSubmit = async () => {
    if(!busqueda) return;
    if(busqueda.length < 4 ) {
      addToast(`La cadena '${busqueda}' es muy corta`, { appearance: 'warning'});
      return;
    }
    const pagina = calculatePage(pageSize, page);
    const { success, data, count } = await requestApi(api.busca(busqueda, pagina), setIsLoading);
    console.log(data);
    if(!success) return;
    if(data.length === 0){ 
      addToast(`No hay resultados para busqueda: ${busqueda}`, { appearance: 'info'});
      return;
    }
    setCount(count);
    setResultadosBusqueda(data);
  }

  const handleClick = (nombre: string) => {
    console.log(nombre);
    const nombreToModify: string = `listaInterpretes.${index}`;
    setValue(nombreToModify, nombre);
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
        <DialogTitle>Buscar Interpretes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Busque intérpretes y dé click en el resultado deseado.
          </DialogContentText>
            <TextField
              required
              onChange={(e) => setBusqueda(e.target.value)}
              autoFocus
              label="Buscar intérpretes"
              fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
          <ButtonLoadingCustom isLoading={isLoading} onClick={onSubmit} label="Buscar"/>
        </DialogActions>
        {resultadosBusqueda && resultadosBusqueda.map((e, index) => (
           <Button key={index} onClick={() => handleClick(e['nombre'])}>{e['nombre']}</Button>
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