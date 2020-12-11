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

const BookingPage = (props) => {
  const { selectedSeats } = props;

  const [Email, setEmail] = useState('');
  const getEmail = async () => {
    try {
      const res = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setEmail(parseData.user_email);
    } catch (err) {
      console.error(err.message);
    }
  };

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

  const [hall, setHall] = useState('');
  const getHallData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/booking/${id}`, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parse = await res.json();
      setHall(parse[0]);
      console.log(parse[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  // const [selectedDate, setSelectedDate] = useState('');
  const [showtimes, setShowtimes] = useState('');
  const getShowtimes = async () => {
    try {
      const res = await fetch(`http://localhost:5000/booking/showtimes/${id}`, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parse = await res.json();
      console.log(parse[0]);
      setShowtimes(parse[0].array_to_string);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEmail();
    getMovie();
    getHallData();
    getShowtimes();
  }, []);
  console.log(showtimes);
  // onChangeDate = (date) => setSelectedDate(date);

  const useStyles = makeStyles((theme) => ({
    blurBackground: {
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,.7) 10%, rgba(0,0,0,.7) 10%),url(${movie.back_image_url})`,
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
      padding: theme.spacing(4, 0, 0, 0),
    },
    bannerTitle: {
      fontSize: theme.spacing(1.4),
      textTransform: 'uppercase',
      color: 'rgb(93, 93, 97)',
      marginBottom: theme.spacing(1),
    },
    bannerContent: {
      fontSize: theme.spacing(2),

      color: theme.palette.common.white,
    },
    [theme.breakpoints.down('sm')]: {
      hideOnSmall: {
        display: 'none',
      },
    },
    checkout: {
      padding: theme.spacing(4, 0, 0, 0),
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
                  disabled
                  value={`${hall.hall_name} зал`}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    margin="none"
                    fullWidth
                    id="start-date"
                    label="Дата сеанса"
                    // value={selectedDate}
                    // onChange={(date) => onChangeDate(date._d)}
                    // minDate={new Date(showtime.startDate)}
                    // maxDate={new Date(showtime.endDate)}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  disabled
                  select
                  label="Время сеанса"
                  variant="outlined"
                >
                  {showtimes.length > 0 &&
                    showtimes.split(',').map((time) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <MenuItem key={`${time}`} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            </Grid>

            <BookingSeats />

            <Grid container className={classes.checkout}>
              <Grid item xs={4} md={8}>
                <Grid container spacing={3} style={{ padding: 20 }}>
                  <Grid item className={classes.hideOnSmall}>
                    <Typography className={classes.bannerTitle}>
                      Email
                    </Typography>
                    <Typography className={classes.bannerContent}>
                      {Email}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.bannerTitle}>
                      Цена
                    </Typography>
                    <Typography className={classes.bannerContent}>
                      {hall.ticket_price}
                      {' \u20BD'}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography className={classes.bannerTitle}>
                      Билеты
                    </Typography>
                    {selectedSeats > 0 ? (
                      <Typography className={classes.bannerContent}>
                        {selectedSeats}
                        {`штук`}
                      </Typography>
                    ) : (
                      <Typography className={classes.bannerContent}>
                        0
                      </Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Typography className={classes.bannerTitle}>
                      Цена
                    </Typography>
                    <Typography className={classes.bannerContent}>
                      {hall.ticket_price * selectedSeats}
                    </Typography>
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
                <Button color="secondary" fullWidth href={`/movies/${id}`}>
                  Отменить
                </Button>
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
                  disabled={selectedSeats > 0}
                  // onClick={() => checkout()}
                >
                  Потвердить
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
