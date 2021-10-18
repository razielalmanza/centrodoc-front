import React, { useContext } from "react";
import { Home, Login, MainSwitch } from ".";
import { AuthContext } from "../context";
import { Route } from "react-router-dom";

export const App = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    isAuth?(
      <>
        <Route exact path="/" component={Home} />
        <Route path="/:tool/:action/:id?" component={MainSwitch} /> 
      </>
    ): <Login/>

  )
}