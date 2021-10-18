import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStylesGrid = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);


export const useStylesMenu = makeStyles((theme: Theme) => 
createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    alignItems: 'start',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 1,
  },
}));