import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import { textTruncate } from '../utils/utils';
import {
  CssBaseline,
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
    borderRadius: '15px !important',
  },
  cardMedia: {
    paddingTop: '43%',
    backgroundRepeat: 'no-repeat',
    borderRadius: '15px !important',
  },
  cardContent: {
    flexGrow: 1,
    background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
    borderRadius: '15px !important',
  },
  action: {
    borderRadius: '15px !important',
  },
}));

const Movies = () => {
  const [data, setData] = useState('');

  const getData = async () => {
    try {
      const res = await fetch('http://localhost:5000/movies', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setData(parseData);
      console.log(parseData);
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
        component="h3"
        variant="h3"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        сейчас в прокате
      </Typography>
      <Carousel animation="fade" interval={10500}>
        {data.length !== 0 &&
          data[0].movie_id !== null &&
          data.map((movies) => (
            <Link
              href={`movies/${movies.movie_id}`}
              style={{ textDecoration: 'none' }}
            >
              <Card className={classes.card}>
                <CardActionArea className={classes.action}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={movies.image_url}
                    title={movies.movie_title}
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h4" component="h4">
                        {movies.movie_title}
                      </Typography>
                      <Typography>
                        {textTruncate(movies.movie_description, 200)}
                      </Typography>
                    </CardContent>
                  </CardMedia>
                </CardActionArea>
              </Card>
            </Link>
          ))}
      </Carousel>
    </>
  );
};

export default Movies;
