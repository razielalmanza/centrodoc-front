import { ListItem, ListItemText, List, Fab, Link } from "@material-ui/core";
//import { Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from "./styles";

interface IProps {
  objeto: any;
  editButton?: boolean;
  tipoItem?: string;
  idItem?: string;
}

export const ListDetailsComponent = (props: IProps) => {
  const { objeto, tipoItem, idItem, editButton = false } = props;
  const classes = useStyles();

  const listItem = (list: any) => {
    return Object.keys(list).map((key, index) => {
      if (typeof list[key] != 'object') 
        return (
          <ListItem key={index} >
            <ListItemText primary={`${key}: ${list[key]}`} />
          </ListItem>)
    })
  }

  return (
    <div>
      {console.log(tipoItem)}
      {editButton && tipoItem? (
        <Link href={`/${tipoItem}/edita/${idItem}`} color="inherit">
          <Fab color="secondary" aria-label="editar">
            <EditIcon />
          </Fab>
        </Link>
      ): (<p></p>)
      }
      <List>
        {listItem(objeto)}
      </List>
    </div>
  )
}