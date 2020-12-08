import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { Typography, Container, Box } from '.';

const Movie = () => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [genre, setGenre] = useState('');
  const { id } = useParams();
  const getMovie = async () => {
    try {
      const res = await fetch(`http://localhost:5000/movies/${id}`, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parse = await res.json();
      setSelectedMovie(parse[0]);
      setGenre(parse[0].movie_genre);
      console.log(parse[0].movie_genre);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  const useStyles = makeStyles((theme) => ({
    backImg: {
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,.9) 25%, transparent 100%),url(${selectedMovie.image_url})`,
      position: 'absolute',
      filter: 'blur(1.3px)',
      height: '100vh',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%',
    },
    movieInfo: {
      background: 'transparant',
      transform: 'translate(0%, 0%)',
      padding: theme.spacing(30, 2, 0, 2),
      margin: theme.spacing(0, 50, 0, 0),
    },
    tag: {
      padding: theme.spacing(0.3, 1),
      marginRight: theme.spacing(1),
      border: '2px solid rgba(255,255,255,0.9)',
      borderRadius: 20,
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Paper className={classes.backImg} />
      <Container className={classes.movieInfo} maxWidth="lg">
        <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
          {genre[0] !== undefined ? (
            genre.map((genree) => (
              <Typography
                variant="subtitle1"
                color="inherit"
                className={classes.tag}
              >
                {genree}
              </Typography>
            ))
          ) : (
            <p>pidoras</p>
          )}
        </Box>

        <Typography gutterBottom variant="h1" color="inherit" align="left">
          {selectedMovie.movie_title}
        </Typography>

        <Typography variant="body1" color="inherit" align="left" paragraph>
          {selectedMovie.movie_description}
        </Typography>
        <Typography variant="h4" color="inherit" align="left" gutterBottom>
          Режиссёр:
          {` `}
          {selectedMovie.movie_director}
        </Typography>
        <Typography variant="body1" color="inherit" gutterBottom>
          {`Длительность: `}
          {selectedMovie.movie_duration}
          {` мин.`}
        </Typography>
      </Container>
    </>
  );
};

export default Movie;
