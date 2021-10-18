import { Backdrop, Button, makeStyles, Theme, createStyles } from "@material-ui/core"
import React, { useState } from "react";
import { CatValueComponent } from ".";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export const MainCatValues = () => {
  const classes = useStyles();
  const [ tipoItem, setTipoItem ] = useState<boolean>(false);
  const [ tamCartel, setTamCartel ] = useState<boolean>(false);
  const [ tamFoto, setTamFoto ] = useState<boolean>(false);
  const [ colorRod, setColorRod ] = useState<boolean>(false);
  const [ extras, setExtras ] = useState<boolean>(false);
  const [ formVideo, setFormVideo ] = useState<boolean>(false);
  const [ panVideo, setPanVideo ] = useState<boolean>(false);

  const handle = (setToApply: any, varToApply: boolean) => {
    setToApply(() => !varToApply);
  }
  return ( 
    <div>
      <Button onClick={() => handle(setTipoItem, tipoItem)} size="small" color="primary">
        Tipo Items
      </Button>
      <Backdrop className={classes.backdrop} open={tipoItem}>
        <div>
          <Button onClick={() => handle(setTipoItem, tipoItem)}> Cerrar </Button>
          <CatValueComponent requestUrl='/catTipoItem'/>
        </div>
      </Backdrop>
      <Button onClick={() => handle(setTamCartel, tamCartel)} size="small" color="primary">Tamaños Carteles</Button>
      <Backdrop className={classes.backdrop} open={tamCartel}>
        <div>
          <Button onClick={() => handle(setTamCartel, tamCartel)}>Cerrar</Button>
          <CatValueComponent requestUrl='/catCartelTamanio'/>
        </div>
      </Backdrop>
      <Button onClick={() => handle(setColorRod, colorRod)} size="small" color="primary"> Colores FotoRodaje </Button>
      <Backdrop className={classes.backdrop} open={colorRod}>
        <div>
          <Button onClick={() => handle(setColorRod, colorRod)}> Cerrar </Button>
          <CatValueComponent requestUrl='/catFotoColor'/>
        </div>
      </Backdrop>
      <Button onClick={() => handle(setExtras, extras)} size="small" color="primary"> Extras Video </Button>
      <Backdrop className={classes.backdrop} open={extras}>
        <div>
          <Button onClick={() => handle(setExtras, extras)}> Cerrar </Button>
          <CatValueComponent requestUrl='/catVideoExtras'/>
        </div>
      </Backdrop>
      <Button onClick={() => handle(setTamFoto, tamFoto)} size="small" color="primary"> Tamanio Foto </Button>
      <Backdrop className={classes.backdrop} open={tamFoto}>
        <div>
          <Button onClick={() => handle(setTamFoto, tamFoto)}> Cerrar </Button>
          <CatValueComponent requestUrl='/catFotoTamanio'/>
        </div>
      </Backdrop>
      <Button onClick={() => handle(setFormVideo, formVideo)} size="small" color="primary"> Formato Video </Button>
      <Backdrop className={classes.backdrop} open={formVideo}>
        <div>
          <Button onClick={() => handle(setFormVideo, formVideo)}> Cerrar </Button>
          <CatValueComponent requestUrl='/catVideoFormato'/>
        </div>
      </Backdrop>
      <Button onClick={() => handle(setPanVideo, panVideo)} size="small" color="primary">Pantalla Video</Button>
      <Backdrop className={classes.backdrop} open={panVideo}>
        <div>
          <Button onClick={() => handle(setPanVideo, panVideo)}> Cerrar </Button>
          <CatValueComponent requestUrl='/catVideoPantalla'/>
        </div>
      </Backdrop>
    </div>
  )
}