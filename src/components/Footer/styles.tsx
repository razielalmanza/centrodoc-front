import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    footer: {
      textAlign: 'center',
      position: 'sticky',
      left: 0,
      bottom: 0,
      width: '100%',
      variant: "body2",
      color: "textSecondary",
      padding: theme.spacing(3, 2),
      marginTop: 'auto',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    }
}));