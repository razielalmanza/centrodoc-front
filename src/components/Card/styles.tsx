import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  titleText:{
    gutterBottom: true, 
    variant: "h5",
     component: "h2"
  },
  secondaryText:{
    variant:"body2",
    color:"textSecondary",
    component:"p"
  },
  button: {
    size:"small", 
    color:"primary",
  },
  media: {
    height: 140,
  },
  linkCardMedia: {
    color: 'inherit',
    textDecoration: 'none'
  }
});
