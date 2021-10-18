import { TextField } from "@material-ui/core"
import { Alert } from "@material-ui/lab";
import React, { useState } from "react"

interface IProps {
  required?: boolean;
  label: string;
  register: any;
  registerVar: string;
  getValues?: any;
  autoFocus?: boolean;
  type?: string;
  defaultValue?: any;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  disabled?: boolean;
  fullWidth?: boolean;
  outlined?: boolean;
}

export const TextFieldCustom = (props: IProps) => {
  const { required = false, label, registerVar, register, getValues, autoFocus = false, type = 'text', defaultValue, autoComplete, maxLength = 1000, minLength = 0, disabled = false, fullWidth = true, outlined = true} = props;

  return(
    <div>
      <TextField
      variant={outlined?  "outlined": undefined}
      margin="normal"
      required={required}
      fullWidth={fullWidth}
      label={label}
      autoFocus={autoFocus}
      type={type}
      defaultValue={defaultValue? defaultValue: undefined}
      autoComplete={autoComplete? autoComplete: undefined}
      disabled={disabled}
      {...register(registerVar, 
        {required: 
          {value: required, message: `${label} vacío.`},
        maxLength:
          {value: maxLength, message: `Max. ${maxLength} carácteres`},
        minLength:
          {value: minLength, message: `Mínimo. ${minLength} carácteres`}})
      }
    />
    { /*(((typeof(defaultValue) == 'string' )  && getValues(registerVar) != null) && getValues(registerVar) !== defaultValue) && <Alert severity="info">Campo modificado.</Alert> */}
  </div>
  )
}