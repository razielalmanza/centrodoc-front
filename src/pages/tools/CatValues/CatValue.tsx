import { Pagination } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react"
import { catTipoItem } from "../../../api/catValues";
import { ApiContext } from "../../../context";
import { List, ListItem } from "@material-ui/core";
import { NotFound } from "../../../components";
import { calculatePage } from "../../../utils";

interface IProps {
  requestUrl: any;
}

const titlePage = "Cat Values";

export const CatValueComponent = (props: IProps) => {
  const { requestUrl } = props;
  const pageSize: number = 10; 
  const [ errorPage, setErrorPage ] = useState<boolean>(true);
  const [ data, setData ] = useState([]);
  const [ count, setCount ] = useState<number>(0);
  const [ page, setPage ] = useState<number>(1);
  const { requestApi } = useContext(ApiContext);
  
  const fetchData = async () => {
    const pagina = calculatePage(pageSize, page);
    const { count, data, success } = await requestApi(catTipoItem(requestUrl, pagina));
    if(!success) return;
    setCount(count);
    setData(data);
    setErrorPage(false);
  } 

  useEffect(() => {
    console.log(data);
    fetchData();
  }, [page]);

  useEffect(() => {   
    document.title = titlePage;
  },[]);
  
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    errorPage?(
      <NotFound errorMessage={`Error en el server o está cargando.`}/>
    ):(
      <div>
        <List>
          {data.map((e, index) => (
            <ListItem key={index}>
              {e}
            </ListItem>
            ))}
        </List>
        <Pagination 
          count={Math.ceil(count/pageSize)} 
          color="primary" 
          size="large"
          page={page} 
          onChange={handleChange} 
        />
      </div>
    )
  )
}