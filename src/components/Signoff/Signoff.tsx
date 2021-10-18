import { Box, Button } from "@material-ui/core";
import React, { useContext } from "react";
import { AuthContext } from "../../context";
import Typography from '@material-ui/core/Typography';
import { useStyles } from "./styles";
import { useToasts } from "react-toast-notifications";

export const SignoffComponent = () =>{
  const { cerrarSesion, isAuth } = useContext(AuthContext);
  const { addToast } = useToasts();

  const onClick = () => {
    addToast('Sesión cerrada', { appearance: 'info'});
    cerrarSesion();
  } 
  const classes = useStyles();
  return (
    <Box className={classes.signoff}>
      {
      isAuth? <Button onClick={onClick} color="secondary" variant="contained" >Cerrar sesión.</Button>
      :
      <Typography variant="subtitle2" >
        Inicie sesión para continuar.
      </Typography>
      }
    </Box>
  )
}