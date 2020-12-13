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
  // MenuItem,
  TextField,
  Typography,
  Button,
  BookingSeats,
} from '.';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [email, setEmail] = useState('');
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

  const [hallScheme, setHallScheme] = useState('');
  const getHallSchemeData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/booking/${id}`, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parse = await res.json();
      setHallScheme(parse[0]);
      console.log(parse[0].hallscheme_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [showtimes, setShowtimes] = useState('');
  const getShowtimes = async () => {
    try {
      const res = await fetch(`http://localhost:5000/booking/showtimes/${id}`, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parse = await res.json();

      setShowtimes(parse[0]);
      console.log(parse[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [seats, setSeats] = useState('');
  const [selectedSeats, setSelectedSeats] = useState('');
  const getSeats = async () => {
    try {
      const res = await fetch(`http://localhost:5000/booking/${id}`, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parse = await res.json();
      setSeats(parse[0].seats);
      console.log(parse[0].seats);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEmail();
    getMovie();
    getHallSchemeData();
    getShowtimes();
    getSeats();
  }, []);

  const [newSeats, setNewSeats] = useState('');
  const updateHallScheme = async () => {
    try {
      const body = { newSeats };
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('token', localStorage.token);

      await fetch(
        `http://localhost:5000/booking/hallschemes/${hallScheme.hallscheme_id}`,
        {
          method: 'PUT',
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const [count, setCount] = useState(0);
  function onSelectSeat(row, seat) {
    setNewSeats(seats);
    if (seats[row][seat] === 1) {
      newSeats[row][seat] = 1;
    } else if (seats[row][seat] === 2) {
      newSeats[row][seat] = 3;
      setCount(count - 1);
    } else if (seats[row][seat] === 3) {
      newSeats[row][seat] = 2;
      setCount(count + 1);
    } else {
      newSeats[row][seat] = 4;
    }
    setSelectedSeats([row, seat]);
    setNewSeats(newSeats);
    console.log(selectedSeats);
    console.log(newSeats);
    console.log(selectedDate);
  }

  function onConfirmBook() {
    console.log(hallScheme.hallscheme_id);
    console.log(newSeats);
    updateHallScheme();
  }

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
              <Grid item xs className={classes.hideOnSmall}>
                <TextField
                  fullWidth
                  disabled
                  value={`${hallScheme.hall_name} зал`}
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
                    minDate={new Date(showtimes.start_date)}
                    maxDate={new Date(showtimes.end_date)}
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  disabled
                  // select
                  value={showtimes.start_at}
                  variant="outlined"
                >
                  {/* {showtimes.length > 0 &&
                    showtimes.split(',').map((time) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <MenuItem key={`${time}`} value={time}>
                        {time}
                      </MenuItem>
                    ))} */}
                </TextField>
              </Grid>
            </Grid>

            <BookingSeats
              seats={seats}
              onSelectSeat={(indexRow, index) => onSelectSeat(indexRow, index)}
            />

            <Grid container className={classes.checkout}>
              <Grid item xs={4} md={8}>
                <Grid container spacing={3} style={{ padding: 20 }}>
                  <Grid item className={classes.hideOnSmall}>
                    <Typography className={classes.bannerTitle}>
                      Email
                    </Typography>
                    <Typography className={classes.bannerContent}>
                      {email}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.bannerTitle}>
                      Цена билета
                    </Typography>
                    <Typography className={classes.bannerContent}>
                      {showtimes.ticket_price}
                      {' \u20BD'}
                    </Typography>
                  </Grid>

                  <Grid item className={classes.hideOnSmall}>
                    <Typography className={classes.bannerTitle}>
                      Билеты
                    </Typography>
                    {count > 0 ? (
                      <Typography className={classes.bannerContent}>
                        {count}
                      </Typography>
                    ) : (
                      <Typography className={classes.bannerContent}>
                        0
                      </Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Typography className={classes.bannerTitle}>
                      Итого
                    </Typography>
                    <Typography className={classes.bannerContent}>
                      {showtimes.ticket_price * count}
                      {' \u20BD'}
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
                <Button color="inherit" fullWidth href={`/movies/${id}`}>
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
                  onClick={() => onConfirmBook()}
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
