import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStylesHome = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      elevation: 1,
      padding: theme.spacing(8, 0, 6), // quitar cuando haya pedo
    },
    title:{
      alignItems: 'start',
      marginTop: theme.spacing(1),
    },
  }),
);