import { Button } from "@material-ui/core";
import { useEffect } from "react";
import {Link} from "react-router-dom";
import { createStyles, makeStyles, Theme} from "@material-ui/core";

const titlePage: string = "Error :(";  

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    link: {
      textDecoration: 'none'
    }
}));

interface IProps {
  errorMessage?: string;
  errorTitle?: string;
  linkRedirect?: string;
}

export const NotFound = (props: IProps) => {
  const { errorMessage, errorTitle, linkRedirect } = props; 
  const classes = useStyles();
  useEffect(() => {
    document.title = errorTitle || titlePage;
  }, []);

  return (
    <div>
      <Link to ="/" className={classes.link}> 
        <p> Llegaste a un error</p>
        <p>{errorMessage}</p>
        <Button color="secondary" variant="contained">
          Regresar a pantalla principal.
        </Button>
      </Link>
    </div>

  )
};