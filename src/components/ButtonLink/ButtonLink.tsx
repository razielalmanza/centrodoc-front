import { Button, Link } from "@material-ui/core";
import { useStyles } from "./styles";

interface IProps {
  to: string,
  label: string,
}

export const ButtonLinkComponent = (props: IProps) => {
  const { to, label} = props;
  const classes = useStyles();

  return (
    <Link href={to} className={classes.link} >
      <Button color="secondary" variant="contained"> {label} </Button>
    </Link>
  )
}