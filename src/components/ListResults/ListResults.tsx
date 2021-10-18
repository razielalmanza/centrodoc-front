import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core"
import PeopleIcon from '@material-ui/icons/People';
import { useStyles } from "./styles";
import { Link } from "react-router-dom";

interface DisplayValue {
  value: string;
  valueName: string;
}

interface IProps{
  resultados: any[],
  displayValues: DisplayValue[]; 
  idRedirect: string;
  query?: string;
  itemId: string;
  count?: number;
}

/**
 * La idea principal es tener un solo compinente para listar resultados, sin que cada objeto/vista tenga el propio, y se reutilice. 
 * 
 * Componente que lista los resultados de las busquedas.
 * En sus props recibe, la lista de resultados a mapear (estos son los que recibe directamente de la petición del api).
 * El itemId para saber qué item es, por tanto redireccionar correctamente.
 * El query opcional para mostrar qué se buscó.
 * Como se utiliza para cualquier tipo de objeto. Es necesario especificar los atributos del objeto que se quieren mostrar, así como
 * el atributo del objeto que será considerado para una redirección a sus detalles.
 * Para este último se esepcifica el id, nombre o lo que vaya a identificar la pantalla de detalles del objeto al hacer click. 
 * Y como este componente puede mostrar varíos detalles sobre un objeto, se tiene que especificar en una lista de objetos DisplayValue
 * el value, que es el atributo con el que se identifica al objeto que se recibe, y el nombre de display que será el que se muestra  de la siguiente forma.
 * 
 * {valueName: 'Localización', value:'path' }.
 * En este ejemplo, se mostrará  una etiqueta 'Localización' por cada elemento de la lista de resultados y se consultará en el valor objeto['path'] 
 * a cada objeto de la lista para obtener el valor.
 * 
 * @param props 
 * @returns 
 */
export const ListResultsComponent = (props: IProps) => {
  const { resultados, displayValues, idRedirect, query, itemId, count } = props;
  const classes = useStyles();
  /**
   * 
   * HACE FALTA UN REFACTOR CON MEJORES LISTAS: TAL VEZ USAR LABELS? QUITAR TODO DE UN LISTITEMTEXT
   */
  const listElements = (resultados: any[]) => (
    <div className={classes.list}>
      {resultados.map((item, index) => (
        <Link to={`/${itemId}/detalles/${item[idRedirect]}`} className={classes.link} key={index}>
          <ListItem button  >
            <ListItemIcon>
              <PeopleIcon/>
            </ListItemIcon>
            {
            displayValues.map( (itemInt, index) => (
              <ListItemText primary={`${itemInt.valueName}: ${item[itemInt.value]}`} key={index}/>
            ))
            }
          </ListItem>
        </Link>   
      ))}
    </div>
  )
  return (
    <div>
      <Typography component="h1" variant="h5">
        Resultados de la busqueda: {query}
      </Typography>
      <Typography component="h1" variant="h6">
        Coincidencias: {count}
      </Typography>
        {
        resultados.length === 0? (<p>No hay resultados</p>)
        :(
          <List>
            {listElements(resultados)} 
          </List>)
        }
    </div>
  )
}