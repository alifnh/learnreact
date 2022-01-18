import React, { useState, useEffect, createContext } from "react";
import Axios from "axios";

export const AppContext = createContext();
export const AppProvider = (props) => {
  const [ loginStatus, setLoginStatus ] = useState(false)
  const [dataFilm, setDataFilm] = useState(null);
  const [dataGame, setDataGame] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const initiateUser = currentUser ? currentUser : null;
  const [user, setUser] = useState(initiateUser);
  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {
    if (dataFilm === null) {
      Axios.get(`https://backendexample.sanbersy.com/api/data-movie`).then(
        (res) => {
          setDataFilm(res.data);
        }
      );
    }
    if (dataGame === null) {
      Axios.get(`https://backendexample.sanbersy.com/api/data-game`).then(
        (res) => {
          setDataGame(res.data);
        }
      );
    }
  });

  return (
    <>
    <AppContext.Provider value={{loginStatus, setLoginStatus, dataFilm, setDataFilm, dataGame, setDataGame, user, setUser, currentId, setCurrentId}}>
      {props.children}
    </AppContext.Provider>
    </>
  );
}