import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router"
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
}));

const GameForm = (props) => {
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
    name: "",
    genre: "",
    singlePlayer: "",
    multiplayer: "",
    platform: "",
    release: "",
    image_url: "",
    id: null,
  });

  const history = useHistory();

  useEffect(() => {
    if(Id !== undefined){
        functionEdit(Id)
    }
    },[])

  const functionEdit = (idMovie) => {
    Axios.get(`https://backendexample.sanbersy.com/api/data-game/${idMovie}`)
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
}
  
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
    if (input.id === null) {
      Axios.post(
        `https://backendexample.sanbersy.com/api/data-game`,
        {
          name: input.name,
          genre: input.genre,
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          platform: input.platform,
          release: input.release,
          image_url: input.image_url,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
        .then((res) => {
          setDataGame([...dataGame, res.data]);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
      setInput({
        name: "",
        genre: "",
        singlePlayer: "",
        multiplayer: "",
        platform: "",
        release: "",
        image_url: "",
      });
    } else {
      Axios.put(
        `https://backendexample.sanbersy.com/api/data-game/${currentId}`,
        {
          name: input.name,
          genre: input.genre,
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          platform: input.platform,
          release: input.release,
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
        name: "",
        genre: "",
        singlePlayer: "",
        multiplayer: "",
        platform: "",
        release: "",
        image_url: "",
      });
    }
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <form method="post" onSubmit={handleSubmit}>
        <TextField
          id="standard-full-width"
          label="Nama"
          placeholder="Masukkan nama game"
          fullWidth
          margin="normal"
          variant="outlined"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Image"
          placeholder="Masukkan image url game"
          fullWidth
          margin="normal"
          variant="outlined"
          name="image_url"
          value={input.image_url}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Genre"
          placeholder="Masukkan genre game"
          fullWidth
          margin="normal"
          variant="outlined"
          name="genre"
          value={input.genre}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Single Palyer"
          placeholder="Masukkan jumlah single player"
          fullWidth
          margin="normal"
          variant="outlined"
          name="singlePlayer"
          value={input.singlePlayer}
          onChange={handleChangeNumber}
        />
        <TextField
          id="standard-full-width"
          label="Multi Player"
          placeholder="Masukkan jumlah multi player"
          fullWidth
          margin="normal"
          variant="outlined"
          name="multiplayer"
          value={input.multiplayer}
          onChange={handleChangeNumber}
        />
        <TextField
          id="standard-full-width"
          label="Platform"
          placeholder="Masukkan platform game"
          fullWidth
          margin="normal"
          variant="outlined"
          name="platform"
          value={input.platform}
          onChange={handleChange}
        />
        <TextField
          id="standard-full-width"
          label="Release"
          placeholder="Masukkan tahun release"
          fullWidth
          margin="normal"
          variant="outlined"
          name="release"
          value={input.release}
          onChange={handleChangeNumber}
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

export default GameForm;
