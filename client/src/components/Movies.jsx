import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { textTruncate } from '../utils/utils';
import {
  CssBaseline,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  Link,
} from '.';

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundRepeat: 'no-repeat',
    borderRadius: '5px',
  },
  cardContent: {
    flexGrow: 1,
    background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
  },
}));

const Movies = () => {
  const [data, setData] = useState('');

  const getData = async () => {
    try {
      const res = await fetch('http://localhost:5000/movies', {
        method: 'GET',
      });

      const parseData = await res.json();
      setData(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        сейчас в прокате
      </Typography>
      <Grid container spacing={2}>
        {data.length !== 0 &&
          data[0].movie_id !== null &&
          data.map((movies) => (
            <Grid item xs={12} sm={6} md={6}>
              <Link
                href={`movies/${movies.movie_id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.cardMedia}
                      image={movies.image_url}
                      title={movies.movie_title}
                    >
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {movies.movie_title}
                        </Typography>
                        <Typography>
                          {textTruncate(movies.movie_description, 150)}
                        </Typography>
                      </CardContent>
                    </CardMedia>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Movies;
