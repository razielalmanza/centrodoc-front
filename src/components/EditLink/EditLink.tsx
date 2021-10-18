import { Fab, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';

interface IProps{
  to: string;
}
const useStyles = makeStyles({
  link: {
    textDecoration: 'none'
  }
});

export const EditLinkComponent = (props: IProps) => { 
  const classes = useStyles();
  const { to } = props;
  return (
    <Link to={to} className={classes.link}>
      <Fab color="secondary" aria-label="editar">
        <EditIcon />
      </Fab>
    </Link>
  )
}