import React, { useEffect, useContext } from 'react';
import { CardComponent } from '../../components';
import { Container, CssBaseline, Grid, Typography} from '@material-ui/core';
import { useStylesHome } from './styles';
import { cardsListTools, cardListItems } from '../../resources/propsCards';
import { SearchContext } from "../../context";

const titlePage: string = "Menú Principal";

export const Home = () => {
 
  const { resetSearch } = useContext(SearchContext);

  useEffect(() => {
    resetSearch();
    document.title = titlePage;
  }, []);

  const classes = useStylesHome();

  return (    
  <Container component="main" maxWidth="xl" >
    <CssBaseline />
    <div className={classes.paper}>
      <Grid container spacing={2}>
        {cardListItems.map((item, id) => (
          <Grid item xs key={id}>
            <CardComponent {...item}/>
          </Grid> 
          ))} 
      </Grid>
    </div>
    <Typography variant="h4" gutterBottom className={classes.title}>Utilidades</Typography>
    <div className={classes.paper}>
      <Grid container spacing={2}>
        {cardsListTools.map((item, id) => (
          <Grid item xs key={id}>
            <CardComponent {...item}/>
          </Grid> 
          ))} 
      </Grid>
    </div>
  </Container>
  )
}


