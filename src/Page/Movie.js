import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Button } from "@material-ui/core";
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
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  grid: {
    marginBottom: 50,
  },
}));

const Movie = () => {
   let {Id} = useParams()
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
      title: "",
      description: "",
      review: "",
      year: "",
      duration: "",
      genre: "",
      rating: "0",
      image_url: "",
      id: null,
    });

   axios.get(`https://backendexample.sanbersy.com/api/data-movie/${Id}`)
      .then((result) => {
          let fetchResult = result.data
          setInput(
              {
                  duration: fetchResult.duration,
                  description: fetchResult.description,
                  id: fetchResult.id,
                  image_url: fetchResult.image_url,
                  genre: fetchResult.genre,
                  title: fetchResult.title,
                  review: fetchResult.review,
                  rating: fetchResult.rating,
                  year: fetchResult.year,
              }

          )

          setCurrentId(fetchResult.id)
      })

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={1} className={classes.grid}>
        <Grid item xs={12} className={classes.grid}>
          <Typography variant="h3" align="left">
            {input.title}
          </Typography>
          <div className={classes.wrap}>
            <img
              src={input.image_url}
              alt="gambar"
              height="400"
              className={classes.img}
            />
            <div>
              <Typography variant="h6" align="left">
                Judul : {input.title}
              </Typography>
              <Typography variant="h6" align="left">
                Durasi : {input.duration}
              </Typography>
              <Typography variant="h6" align="left">
                Genre : {input.genre}
              </Typography>
              <Typography variant="h6" align="left">
                Rating : {input.rating}
              </Typography>
              <Typography variant="h6" align="left">
                Tahun : {input.year}
              </Typography>
            </div>
          </div>
          <Typography variant="h6" align="left">
            Deskripsi : {input.description}
          </Typography>
          <Typography variant="h6" align="left">
            Review : {input.review === null ? "-" : input.review}
          </Typography>
        </Grid>
        <Button color="inherit">
          <Link className={classes.link} to="/">
            Kembali
          </Link>
        </Button>
      </Grid>
    </Container>
  );
};

export default Movie;
