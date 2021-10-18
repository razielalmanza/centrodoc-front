import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => 
createStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  linkText: {
    color: 'inherit',
    textDecoration: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  closeMenuButton: {
    marginLeft: 0,
  },
  subtitle: {
    fontWeight: 'bold',
  }
}));
