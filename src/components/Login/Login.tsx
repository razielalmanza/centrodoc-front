import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useStylesLogin } from './styles';
import { ButtonLoadingCustom, TextFieldCustom } from '..';
import { Alert } from '@material-ui/lab';

interface PropsLogin {
  handleSubmit: (func: any) => any;
  onSubmit: (data: any) => any;
  register: any;
  errors: any;
  isLoading: boolean;
}

export const LoginComponent = (props: PropsLogin ) => {
  const { handleSubmit, onSubmit, register, errors, isLoading } = props;
  const classes = useStylesLogin();

  return (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}></Avatar>
      <Typography component="h1" variant="h5">
        Iniciar sesión
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} >
        <TextFieldCustom
          required
          label="Usuario"
          autoComplete="username"
          autoFocus
          register={register}
          registerVar="usuario"
        />
        {errors.usuario && <Alert severity="warning">{errors.usuario.message}</Alert>}
        <TextFieldCustom
          required
          label="Password"
          type="password"
          autoComplete="current-password"
          register={register}
          registerVar="password"
        />
        {errors.password && <Alert severity="warning">{errors.usuario.password}</Alert>}
        <ButtonLoadingCustom label="Inciar sesión" isLoading={isLoading} />
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Recuperar contraseña.
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  </Container>
  )
} 