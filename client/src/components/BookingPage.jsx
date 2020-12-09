import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Button,
  BookingSeats,
} from '.';

const BookingPage = () => {
  const [movie, setMovie] = useState('');
  const { id } = useParams();
  const getMovie = async () => {
    try {
      const res = await fetch(`http://localhost:5000/movies/${id}`, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parse = await res.json();
      setMovie(parse[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movie);
  const useStyles = makeStyles((theme) => ({
    blurBackground: {
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,.7) 10%, rgba(0,0,0,.7) 10%),url(${movie.image_url})`,
      position: 'absolute',
      top: 0,
      zIndex: -1,
      right: 0,
      height: '100vh',
      filter: 'blur(6px)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%',
    },
    container: {
      background: 'transparant',
      transform: 'translate(0%, 0%)',
    },
    form: {
      margin: theme.spacing(4, 0, 0, 0),
    },
    bannerTitle: {
      fontSize: theme.spacing(1.4),
      textTransform: 'uppercase',
      color: 'rgb(93, 93, 97)',
      marginBottom: theme.spacing(1),
    },
    bannerContent: {
      fontSize: theme.spacing(2),
      textTransform: 'capitalize',
      color: theme.palette.common.white,
    },
    [theme.breakpoints.down('sm')]: {
      hideOnSmall: {
        display: 'none',
      },
    },
  }));

  const classes = useStyles();
  return (
    <>
      <Container className={classes.container} maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Grid className={classes.form} container spacing={3}>
              <Grid item xs>
                <TextField
                  fullWidth
                  select
                  label="Выбрать зал"
                  variant="outlined"
                >
                  <MenuItem>{` `}</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    inputVariant="outlined"
                    margin="none"
                    fullWidth
                    id="start-date"
                    label="Дата сеанса"
                    // minDate={new Date(showtime.startDate)}
                    // maxDate={new Date(showtime.endDate)}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  select
                  label="Время сеанса"
                  variant="outlined"
                >
                  <MenuItem>{` `}</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <BookingSeats />

            <Grid container>
              <Grid item xs={8} md={10}>
                <Grid container spacing={3} style={{ padding: 20 }}>
                  <Grid item className={classes.hideOnSmall}>
                    <Typography className={classes.bannerTitle}>
                      Email
                    </Typography>
                    <Typography className={classes.bannerContent}>
                      {` `}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography className={classes.bannerTitle}>
                      Билеты
                    </Typography>
                    <Typography className={classes.bannerContent}>0</Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.bannerTitle}>
                      Цена
                    </Typography>
                    {/* <Typography className={classes.bannerContent}>
                  {ticketPrice * selectedSeats} &euro;
                </Typography> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
                md={2}
                style={{
                  display: 'flex',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  // disabled={seatsAvailable <= 0}
                  // onClick={() => onBookSeats()}
                >
                  Checkout
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.blurBackground} />
    </>
  );
};

export default BookingPage;
