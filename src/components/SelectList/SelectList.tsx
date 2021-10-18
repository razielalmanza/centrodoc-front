import { Box, Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import { SelectValuesType, paisesISOAlpha3 } from "../../resources/countries";

interface IProps {
  isEdita?: boolean,
  setValor: any
  defaultValue?: string,
  listValues: SelectValuesType[],
  tipoSelect: string,
}

export const SelectListComponent = (props: IProps) => {
  const { setValor, isEdita = false, defaultValue = '', listValues, tipoSelect } = props;
  const [value, setValue] = useState<SelectValuesType | null>();
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <Autocomplete
        options={listValues}
        autoHighlight
        getOptionLabel={(option) => `${option.label} || ${option.code}`}
        renderInput={(params) => <TextField {...params} label={isEdita? `${tipoSelect} a editar` : tipoSelect} />}
        value={value}
        onChange={(event: any, newValue: SelectValuesType | null) => {
          setValue(newValue);
          setValor(newValue?.code);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      />
      {isEdita && <Chip label={`${tipoSelect} registrado: ${defaultValue? defaultValue:'sin información'}`} />}
    </div>
  );
}