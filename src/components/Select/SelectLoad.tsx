import { FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import { useToasts } from "react-toast-notifications";
import { rolesPersona } from "../../api/personas";
import { useStyles } from "./styles";

interface IProps{
  register: any;
  registerVar: string;
  idPersona?: string | number;
  idTitulo?: string | number;
}

export const SelectLoadComponent = (props: IProps) => {
  const { register, registerVar, idPersona, idTitulo } = props;
  const [ roles, setRoles ] = useState<string[]>([]);
  const classes = useStyles();
  const { addToast } = useToasts();

  const fetchData = async () => {
    const rolesRequest = await rolesPersona(idPersona, idTitulo);
    setRoles(rolesRequest);
    if (rolesRequest.length === 0) 
      addToast('ESTA PERSONA NO TIENE RELACIONES CON ESTE TÍTULO. No HACE FALTA DESASOCIAR', {appearance: 'error'});
    console.log(rolesRequest);
  }
  useEffect(() => {
    fetchData();
  }, [idPersona]);
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Rol</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        {...register(registerVar)}
      >
        {roles.map((value, index) => (
          <MenuItem key={index} value={value}>{value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}