import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
  Box,
  Button,
  ArrowBackIcon,
  ConfirmationNumberIcon,
} from '.';

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
    genre: {
      padding: theme.spacing(0.5, 4),
      marginRight: theme.spacing(1.5),
      border: '2px solid ',
      borderColor: '#5f5da9',
      borderRadius: 20,
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.5, 2),
      },
    },
    description: {
      mixBlendMode: 'difference',
      padding: theme.spacing(0, 50, 0, 0),
    },
    director: {
      color: theme.palette.primary.light,
    },
    btn: {
      border: '2px solid ',
      borderColor: '#5f5da9',
      borderRadius: 20,
      padding: theme.spacing(0.7, 4),
      marginRight: theme.spacing(1.5),
    },
    [theme.breakpoints.down('sm')]: {
      movieInfo: { padding: theme.spacing(15, 2, 0, 2) },
      description: { padding: theme.spacing(0, 10, 0, 0) },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div className={classes.backImg} />
      <Container className={classes.movieInfo} maxWidth="lg">
        <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
          {genre[0] !== undefined ? (
            genre.map((genree) => (
              <Typography
                variant="subtitle1"
                color="inherit"
                className={classes.genre}
              >
                {genree}
              </Typography>
            ))
          ) : (
            <p>No genres</p>
          )}
        </Box>

        <Typography gutterBottom variant="h1" color="inherit" align="left">
          {selectedMovie.movie_title}
        </Typography>

        <Typography
          className={classes.description}
          variant="body1"
          color="inherit"
          align="left"
          paragraph
        >
          {selectedMovie.movie_description}
        </Typography>
        <Typography
          className={classes.director}
          variant="h5"
          align="left"
          gutterBottom
        >
          Режиссёр:
          {` `}
          {selectedMovie.movie_director}
        </Typography>
        <Typography variant="body1" color="inherit" gutterBottom paragraph>
          {`Длительность: `}
          {selectedMovie.movie_duration}
          {` мин.`}
        </Typography>
        <Button
          className={classes.btn}
          variant="outlined"
          href="/dashboard"
          startIcon={<ArrowBackIcon />}
        >
          Назад
        </Button>
        <Button
          className={classes.btn}
          variant="outlined"
          href={`/booking/${id}`}
          startIcon={<ConfirmationNumberIcon />}
        >
          Купить билеты
        </Button>
      </Container>
    </>
  );
};

export default Movie;
