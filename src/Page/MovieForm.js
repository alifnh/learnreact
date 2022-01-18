import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router"
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
}));

const MovieForm = () => {
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

  useEffect(() => {
   if(Id !== undefined){
       functionEdit(Id)
   }
   },[])

   const functionEdit = (idMovie) => {
      axios.get(`https://backendexample.sanbersy.com/api/data-movie/${idMovie}`)
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
}

  const history = useHistory();

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleChangeNumber = (event) => {
    if (isNaN(parseInt(event.target.value))) {
      setInput({ ...input, [event.target.name]: "" });
    } else {
      setInput({ ...input, [event.target.name]: event.target.value });
    }
  };

  const handleCancel = () => {
    history.push("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("123")
    if (currentId === null) {
      axios.post(
        `https://backendexample.sanbersy.com/api/data-movie`,
        {
          title: input.title,
          description: input.description,
          review: input.review,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          rating: input.rating,
          image_url: input.image_url,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
        .then((res) => {
          setDataFilm([...dataFilm, res.data]);
          history.push("/");
        })
        .catch((err) => {
          alert(err);
        });
      setInput({
        title: "",
        description: "",
        review: "",
        year: "",
        duration: "",
        genre: "",
        rating: "",
        image_url: "",
      });
    } else {
      axios.put(
        `https://backendexample.sanbersy.com/api/data-movie/${currentId}`,
        {
          title: input.title,
          description: input.description,
          review: input.review,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          rating: input.rating,
          image_url: input.image_url,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
        .then((res) => {
            history.push("/");
        })
        .catch((err) => {
          alert(err);
        });
      setInput({
        title: "",
        description: "",
        review: "",
        year: "",
        duration: "",
        genre: "",
        rating: "",
        image_url: "",
      });
    }
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <form method="post" onSubmit={handleSubmit}>
        <TextField
          id="standard-full-width"
          label="Judul"
          placeholder="Masukkan judul film"
          fullWidth
          margin="normal"
          variant="outlined"
          name="title"
          value={input.title}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Image"
          placeholder="Masukkan image url film"
          fullWidth
          margin="normal"
          variant="outlined"
          name="image_url"
          value={input.image_url}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Durasi"
          placeholder="Masukkan durasi film"
          fullWidth
          margin="normal"
          variant="outlined"
          name="duration"
          value={input.duration}
          onChange={handleChangeNumber}
        />
        <TextField
          id="standard-full-width"
          label="Genre"
          placeholder="Masukkan genre film"
          fullWidth
          margin="normal"
          variant="outlined"
          name="genre"
          value={input.genre}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Rating"
          placeholder="Masukkan rating film"
          fullWidth
          margin="normal"
          variant="outlined"
          name="rating"
          value={input.rating}
          onChange={handleChangeNumber}
        />
        <TextField
          id="standard-full-width"
          label="Year"
          placeholder="Masukkan tahun film"
          fullWidth
          margin="normal"
          variant="outlined"
          name="year"
          value={input.year}
          onChange={handleChangeNumber}
        />
        <TextField
          id="standard-full-width"
          label="Deskripsi"
          placeholder="Masukkan deskripsi film"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline={true}
          rows="5"
          name="description"
          value={input.description}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Review"
          placeholder="Masukkan review film"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline={true}
          rows="5"
          name="review"
          value={input.review}
          onChange={handleChange}
        />
        <Button
          onClick={() => handleCancel()}
          variant="contained"
          color="secondary"
          disableElevation
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default MovieForm;