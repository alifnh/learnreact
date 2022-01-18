import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./Page/Login"
import Cookies from "js-cookie";
import { UserContext, AppProvider } from "./AppContext";
import Register from "./Page/Register";
import LayoutComponent from './Layout/Layout';
import Home from "./Page/Home";
import MovieTable from "./Page/MovieList";
import MovieForm from "./Page/MovieForm";
import GameTable from "./Page/GameList";
import GameForm from "./Page/GameForm";
import GantiPassword from "./Page/ChangePassword";
import Movie from "./Page/Movie";
import Game from "./Page/Game";

const Routes = () => {
  // const currentUser = JSON.parse(localStorage.getItem("user"));
  // const initiateUser = currentUser ? currentUser : null;
  // const [user, setUser] = useState(initiateUser)

  const LoginRoute = ({ ...props }) => { 
    if(Cookies.get('username') === undefined) { return <Route {...props} /> }
    else if( Cookies.get('username') !== undefined ) { return <Redirect to="/" /> } 
    }

  return (
    <>
      <Router>
        <AppProvider>
        <Switch>
          <Route path="/" exact>
          <LayoutComponent content={<Home/>}/>
          </Route>
          <Route path="/login" exact>
            <LayoutComponent content={<Login/>}/>
          </Route>
          <LoginRoute exact path="/login" component={Login} />
          <Route path="/register" exact>
            <LayoutComponent content={<Register/>}/>
          </Route>
          <Route path="/movielist" exact>
            <LayoutComponent content={<MovieTable/>}/>
          </Route>
          <Route path="/movieform" exact>
            <LayoutComponent content={<MovieForm/>}/>
          </Route>
          <Route path="/gamelist" exact>
            <LayoutComponent content={<GameTable/>}/>
          </Route>
          <Route path="/gameform" exact>
            <LayoutComponent content={<GameForm/>}/>
          </Route>
          <Route path="/movieform/edit/:Id" exact>
            <LayoutComponent content={<MovieForm/>}/>
          </Route>
          <Route path="/gameform/edit/:Id" exact>
            <LayoutComponent content={<GameForm/>}/>
          </Route>
          <Route path="/changepassword" exact>
            <LayoutComponent content={<GantiPassword/>}/>
          </Route>
          <Route path="/movie/:Id" exact>
            <LayoutComponent content={<Movie/>}/>
          </Route>
          <Route path="/game/:Id" exact>
            <LayoutComponent content={<Game/>}/>
          </Route>
        </Switch>
        </AppProvider>
      </Router>
    </>
  )
}

export default Routes