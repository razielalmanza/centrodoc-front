import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { linkHome, listItems, listTools } from "../../resources/propsLinks";


export const DrawerComponent = ( ) => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleDrawer() {
    setIsOpen(() => !isOpen);
  }
  const classes = useStyles();

  /** 
   * Regresa un div con ListItems, de la lista que recibe, Muestra un ícono, texto y se engloba 
   * en un link.
   */
  const listElements = (list: any[]) => (
    <div className={classes.list}>
      {list.map((item, index) => (
        <Link to={item.redirect} className={classes.linkText} key={index}>
          <ListItem button >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        </Link>
      ))}
    </div>
  );

  return (
    <div>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer}>
        <MenuIcon/>
        <Drawer anchor={'left'} open={isOpen} onClose={toggleDrawer} variant={'temporary'}>
          <List>
            <ListItem button>
              <CloseIcon className={classes.closeMenuButton} onClick={toggleDrawer}/>
            </ListItem>
            {listElements([linkHome])}
            <ListItem>
              <ListItemText primary={<Typography variant="h6">Herramientas</Typography>}/>
            </ListItem>
            {listElements(listTools)}
            <Divider />
            <ListItem>
              <ListItemText primary={<Typography variant="h6">Items</Typography>}/>
            </ListItem>
            {listElements(listItems)}
          </List>
        </Drawer>
      </IconButton>    
    </div>
  );
};