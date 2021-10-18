
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import { SignoffComponent, SearchComponent, DrawerComponent } from '..';
import { Link } from "react-router-dom";

export const AppBarComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <DrawerComponent/>
          <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.linkTopBar}>
                Centro de Documentación
              </Link>            
          </Typography>
          <SearchComponent/>
          <SignoffComponent/>
        </Toolbar>
      </AppBar>
    </div>
  );
}