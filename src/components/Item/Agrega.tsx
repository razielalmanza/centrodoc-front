import { Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { TextFieldCustom } from "../";
import { useStylesAgrega } from "../../pages/styles";
import { Item } from "../../types";

interface IProps {
  register: any;
  errors: any;
  item?: any;
  isEditaComponent?: boolean;
}

export const AgregaItemBase = (props: IProps) => {
  const { register, errors, item, isEditaComponent = false } = props;
  const classes = useStylesAgrega();
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="subtitle2">
        Componente Base Item
      </Typography>
      {isEditaComponent? (
      <TextFieldCustom
          autoFocus
          disabled
          register={register}
          registerVar="idcd_item"
          label={`Id item: ${item?.idcdItem}`}
          defaultValue={item?.idcdItem}
          />):<></>}
      <TextFieldCustom
        autoFocus
        register={register}
        registerVar="imagen_digital"
        label="Imagen Digital"
        defaultValue={item?.imagenDigital}
      />
      <TextFieldCustom
        required={isEditaComponent? false: true}
        autoFocus={isEditaComponent? true: false}
        register={register}
        registerVar="colocacion"
        label="Colocacion"
        defaultValue={item?.colocacion}
      />
      {errors.colocacion && <Alert severity="warning">{errors.colocacion.message}</Alert>}
      <TextFieldCustom
        required={isEditaComponent? false: true}
        autoFocus={isEditaComponent? true: false}
        register={register}
        registerVar="notas"
        label="Notas"
        defaultValue={item?.notas}
      />
      {isEditaComponent && errors.imagen_digital && <Alert severity="warning">{errors.imagen_digital.message}</Alert>}
    </div>
  )
}