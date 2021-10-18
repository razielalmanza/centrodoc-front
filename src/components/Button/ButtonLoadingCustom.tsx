import { Button, CircularProgress } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

interface IProps {
  isLoading: boolean;
  label: string;
  type?: "button" | "reset" | "submit" | undefined;
  classesCustom?: any;
  onClick?: any;
}
/**
 * Botón que se usa princiaplmente para forms, es decir es de tipo submit.
 * Su parametro isLoading lo usa para mostrar una animacion de carga cuando este es true.
 * Este valor es manejado cuando desde donde es llamda se triggerea el onSubmit al que está ligado el form al que pertence este componente.
 * @param props 
 * @returns 
 */
export const ButtonLoadingCustom = (props: IProps) => {
  const { isLoading, label, type, classesCustom, onClick = undefined } = props;
  let classes = useStyles();
  if(classesCustom) classes = classesCustom;
  return (
    isLoading?
    (
      <CircularProgress/>)
    :
    (<Button
      type={type? type: "submit"}
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      onClick={onClick}
    >
      {label}
    </Button>)
  )

} 