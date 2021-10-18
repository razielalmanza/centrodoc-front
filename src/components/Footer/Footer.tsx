import Typography from '@material-ui/core/Typography';
import { Link} from '@material-ui/core';
import { useStyles } from './styles';

export function FooterComponent() {
  const classes = useStyles();
  return (
      <Typography className={classes.footer}>
        {' Copyright © Filmoteca UNAM '}
        <Link color="inherit" href="www.filmoteca.unam.mx"> 
          Filmoteca
        </Link>
        {' 2021. '}
      </Typography>
  );
}