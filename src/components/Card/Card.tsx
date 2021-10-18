import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";


export interface PropsCard {
  imageUrl: string;
  title: string;
  secondaryText: string;
  redirect: string;
  item?: boolean; // No implentado, pero abre la posibilidad de manejar dos diseños diferentes según las tarjetas.
  detailedText?: string;
  icon?: any;
}

export const CardComponent = (props: PropsCard) => {
  const { imageUrl, title, secondaryText, redirect, item = false } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to={redirect} className={classes.linkCardMedia}>
        <CardActionArea>
          <CardMedia
            image={imageUrl}
            component="img"
            height="140"
          />
          <CardContent>
            <Typography   
            gutterBottom 
            variant= "h5"
            component= "h2">
              {title}
            </Typography>
            <Typography 
              variant="body2"
              color="textSecondary"
              component="p">
            {secondaryText}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button     
        size="small"
        color="primary">
          Mas info.
        </Button>
      </CardActions>
    </Card>
  );
}