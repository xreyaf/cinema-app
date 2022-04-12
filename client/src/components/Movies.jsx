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

const useStyles = makeStyles((theme) => ({
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
    color: theme.palette.common.white,
  },
  cardContent: {
    flexGrow: 1,
    background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
    borderRadius: '0 0 15px 15px !important',
  },
  action: {
    borderRadius: '15px !important',
  },
  movies: {
    margin: '5vh auto 0 auto',
    width: '80vw',
  },
  safety: { margin: '5vh auto', width: '80vw' },
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
      <div className={classes.movies}>
        <Carousel
          className={classes.carousel}
          animation="fade"
          interval={10500}
        >
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
                        <Typography gutterBottom variant="h3" component="h1">
                          {movies.movie_title}
                        </Typography>
                        <Typography variant="body1" component="p">
                          {textTruncate(movies.movie_description, 300)}
                        </Typography>
                      </CardContent>
                    </CardMedia>
                  </CardActionArea>
                </Card>
              </Link>
            ))}
        </Carousel>
      </div>
      <div className={classes.safety}>
        <h1>БЕЗОПАСНЫЙ КИНОТЕАТР</h1>
        <Typography variant="body1" component="p">
          Для нас важно, чтобы Вы чувствовали себя комфортно. Поэтому сотрудники
          кинотеатра ежедневно соблюдают федеральные стандарты безопасности
          гостей.
        </Typography>
        <br />
        <Typography variant="body1" component="p">
          Рекомендуем приобретать билеты на сайте. Такие билеты легко обменять и
          вернуть при необходимости. Мы принимаем бесконтактную оплату.
        </Typography>
        <br />
        <Typography variant="body1" component="p">
          Вы можете оплатить покупки бара картой или с помощью гаджетов в
          кинотеатре. Кассовая программа автоматически бронирует соседние места
          от купленных билетов и отмечает как занятые.
        </Typography>
        <br />
        <Typography variant="body1" component="p">
          Вы можете выбирать места рядом с занятыми, при этом дистанция между
          вами и другими гостями будет сохранена.
        </Typography>
        <br />
        <Typography variant="body1" component="p">
          Интервалы между сеансами увеличены, чтобы дополнительно проветрить
          залы и провести тщательную обработку поверхностей. В фойе Вы можете
          воспользоваться бесплатным антисептиком для дезинфекции рук.
        </Typography>
        <br />
      </div>
    </>
  );
};

export default Movies;
