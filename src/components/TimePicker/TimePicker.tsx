import { Input, TextField } from "@material-ui/core";
import { SetStateAction, useState } from "react";

interface IProps {
  label: string;
  isEdita?: boolean;
  setValueFunction: any;
  read_only?: boolean; 
  defaultValue?: Date | number;
}

export const TimePickerComponent = (props: IProps) => {
    const { label, isEdita = false, setValueFunction, read_only = false, defaultValue } = props;
    const [value, setValue] = useState("00:00");
  
    const onChange = (event: any) => {
      console.log(event.target.value);
      setValue(event.target.value);
      setValueFunction(event.target.value);
    };
  
    const onBlur = (event: any) => {
      const value = event.target.value;
      const seconds = Math.max(0, getSecondsFromHHMMSS(value));
  
      const time = toHHMMSS(seconds);
      setValue(time);
      setValueFunction(seconds);
    };
  
    const getSecondsFromHHMMSS = (value: string) => {
      const [str1, str2, str3] = value.split(":");
  
      const val1 = Number(str1);
      const val2 = Number(str2);
      const val3 = Number(str3);
  
      if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
        return val1;
      }
  
      if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
        return val1 * 60 + val2;
      }
  
      if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
        return val1 * 60 * 60 + val2 * 60 + val3;
      }
  
      return 0;
    };
  
    const toHHMMSS = (secs: number) => {
      const secNum = parseInt(secs.toString(), 10);
      const hours = Math.floor(secNum / 3600);
      const minutes = Math.floor(secNum / 60) % 60;
      const seconds = secNum % 60;
  
      return [hours, minutes, seconds]
        .map((val) => (val < 10 ? `0${val}` : val))
        .filter((val, index) => val !== "00" || index > 0)
        .join(":")
        .replace(/^0/, "");
    };
  
    return (
      <TextField type="text" onChange={onChange} onBlur={onBlur} value={value} label={label}/>
    );
  };