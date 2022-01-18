import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import { AppContext } from "../AppContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router"
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  wrap: {
    overflowY: "hidden",
    marginBottom: 30,
    display: "flex",
    marginTop: 50,
    flexWrap: "wrap",
  },
  img: {
    marginRight: 30,
  },
}));

const Game = () => {
   let {Id} = useParams();
   const classes = useStyles();
   const {
      dataFilm,
      setDataFilm,
      dataGame,
      setDataGame,
      user,
      setUser,
      setCurrentId,
      currentId
     } = useContext(AppContext);
     const [input, setInput] = useState({
      name: "",
      genre: "",
      singlePlayer: "",
      multiplayer: "",
      platform: "",
      release: "",
      image_url: "",
      id: null,
    });

    axios.get(`https://backendexample.sanbersy.com/api/data-game/${Id}`)
      .then((result) => {
          let fetchResult = result.data
          setInput(
              {
               name: fetchResult.name,
               genre: fetchResult.genre,
               singlePlayer: fetchResult.singlePlayer,
               multiplayer: fetchResult.multiplayer,
               platform: fetchResult.platform,
               release: fetchResult.release,
               image_url: fetchResult.image_url,
              }

          )

          setCurrentId(fetchResult.id)
      })
  
    return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h3" align="left">
            {input.name}
          </Typography>
          <div className={classes.wrap}>
            <img
              src={input.image_url}
              alt="gambar"
              height="400"
              className={classes.img}
            />
          </div>
          <Typography variant="h6" align="left">
            Judul : {input.name}
          </Typography>
          <Typography variant="h6" align="left">
            Platform : {input.platform}
          </Typography>
          <Typography variant="h6" align="left">
            Genre : {input.genre}
          </Typography>
          <Typography variant="h6" align="left">
            Single Player : {input.singlePlayer}
          </Typography>
          <Typography variant="h6" align="left">
            Multi Player : {input.multiplayer}
          </Typography>
          <Typography variant="h6" align="left">
            Release : {input.release}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Game;
