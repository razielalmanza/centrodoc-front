import { Button } from "@material-ui/core";
import { useEffect } from "react";
import {Link} from "react-router-dom";
import { createStyles, makeStyles, Theme} from "@material-ui/core";
import { Permisos } from "../../types";

const titlePage: string = "No tiene el permiso para acceder.";  

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    link: {
      textDecoration: 'none'
    }
}));

interface IProps {
  permissionsNeeded?: Permisos[],
  permissionsGranted?: Permisos[], 
}

export const NoPermissionComponent = (props: IProps) => {
  const { permissionsGranted, permissionsNeeded } = props; 
  const classes = useStyles();
  useEffect(() => {
    document.title = titlePage;
  }, []);

  return (
    <div>
      <Link to ="/" className={classes.link}> 
        <p> No cuentas con los permisos necesarios para acceder a este recurso.</p>
        <Button color="secondary" variant="contained">
          Regresar a pantalla principal.
        </Button>
      </Link>
    </div>
  )
};