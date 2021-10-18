import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  link:{
    textDecoration: 'none',
    color: 'inherit'
  },
  list: {
    width: 700,
  },
}));