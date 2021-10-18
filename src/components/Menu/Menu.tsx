import { Grid, Typography, Button } from "@material-ui/core"
import React, { useEffect } from "react"
import { ButtonLinkComponent } from "..";
import { useStylesGrid, useStylesMenu } from "./styles"

interface propsMenu{
  toolId: string;
  desasocia?: boolean;
  asocia?: boolean;
  asociaLabel?: string;
 }

export const MenuComponent = (props: propsMenu) => {
  const { toolId, asocia = false, desasocia = false, asociaLabel = 'Asocia' } = props;

  useEffect(() => {
    document.title = toolId;
  }, []);

  const classes = useStylesGrid();
  const classes1 = useStylesMenu();

  return (
    <div>
      <Typography variant="h4" className={classes1.title}> Menu: {toolId} </Typography>
      <Typography variant="subtitle2" className={classes1.title}> Elige la acción a ejecutar.</Typography>
      <div className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item >
            <ButtonLinkComponent to='agrega' label='Agrega'/>
          </Grid>
          {asocia?
          <Grid item >
            <ButtonLinkComponent to='asocia' label={asociaLabel}/>
          </Grid>
          : <></>}
          {desasocia?
          <Grid item >
            <ButtonLinkComponent to='desasocia' label={`Des${asociaLabel}`}/>
          </Grid>
          : <></>} 
        </Grid>
      </div>
    </div>
  )
}