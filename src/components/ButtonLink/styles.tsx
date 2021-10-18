import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => 
createStyles({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}));