import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
      <Grid container spacing={2}>
        {data.length !== 0 &&
          data[0].movie_id !== null &&
          data.map((movies) => (
            <Grid item xs={12} sm={6} md={6}>
              <Link href={data.image_url} underline="none">
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.cardMedia}
                      image={movies.image_url}
                      title="Image title"
                    >
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {movies.movie_title}
                        </Typography>
                        <Typography>
                          {movies.movie_description.slice(0, 150)}
                          {`...`}
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
