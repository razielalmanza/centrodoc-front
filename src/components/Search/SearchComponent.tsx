import React, { useContext, useState } from 'react';
import { Button, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './styles';
import { SearchContext, AuthContext } from '../../context';
import { Link } from 'react-router-dom';

const notAvailable: string[] = ['catvalues'];
const advanced: string[] = ['titulos'];
const basic: string[] = ['stills', 'cartel', 'foto', 'fomo', 'vhs_dvd'];

export const SearchComponent = () => {
  const { itemId } = useContext(SearchContext);
  const { isAuth } = useContext(AuthContext);
  const classes = useStyles();

  const NotAvailableComponent = () => (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
          <SearchIcon/>
      </div>
      <InputBase
          placeholder={`No disponible para: ${itemId}`}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          disabled
        />
    </div>
  )

  const BaseComponent = (props: any) => {
    const [ input, setInput ] = useState<string>("");
    return (
      <div>
        <div className={classes.search}>
          <form action={`/${itemId}/busca/${input}`}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder={`Busca: ${itemId}`}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={event=>{setInput(event.target.value)}}
              inputProps={{ 'aria-label': 'search' }}
            />
          </form>
        </div>
        {props.children}
      </div>
    )
  };

  interface ButtonProps{
    label: string;
  }
  const ButtonComponent = (props: ButtonProps) => {
    const { label } = props;
    return (
      <div className={classes.search}>
        <Link to={`/${itemId}/busca`} className={classes.link}>
          <Button variant="text" endIcon={<SearchIcon />} className={classes.inputInput}>         
            {label}
          </Button>
        </Link>
      </div>
    )
  }

  const selector = () => {
    if(itemId === '' || !isAuth ) return <></>;
    if(basic.includes(itemId)) return <ButtonComponent label={`Busca ${itemId}`}/>;
    if(notAvailable.includes(itemId)) return <NotAvailableComponent/>;
    if(advanced.includes(itemId)) return <BaseComponent children={<ButtonComponent label="Búsqueda Avanzada" />}/> ;
    return <BaseComponent children={<></>}/> ;
  }
  return (
    selector()
  )
 }