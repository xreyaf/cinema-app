/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
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
  const [userId, setUserId] = useState('');
  const getEmail = async () => {
    try {
      const res = await fetch('https://cinema-appp.herokuapp.com/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setEmail(parseData.user_email);
      setUserId(parseData.user_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [movie, setMovie] = useState('');
  const { id } = useParams();
  const getMovie = async () => {
    try {
      const res = await fetch(
        `https://cinema-appp.herokuapp.com/movies/${id}`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );

      const parse = await res.json();
      setMovie(parse[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [hallScheme, setHallScheme] = useState('');
  const getHallSchemeData = async () => {
    try {
      const res = await fetch(
        `https://cinema-appp.herokuapp.com/booking/${id}`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );

      const parse = await res.json();
      setHallScheme(parse[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [showtime, setShowtime] = useState('');
  const getShowtime = async () => {
    try {
      const res = await fetch(
        `https://cinema-appp.herokuapp.com/booking/showtimes/${id}`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );

      const parse = await res.json();
      setShowtime(parse[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [seats, setSeats] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [selectedSeats, setSelectedSeats] = useState('');
  const [newSeats, setNewSeats] = useState('');
  let bookedSeats = [];
  const getSeats = async () => {
    try {
      const res = await fetch(
        `https://cinema-appp.herokuapp.com/booking/${id}`,
        {
          method: 'GET',
          headers: { token: localStorage.token },
        }
      );

      const parse = await res.json();
      setSeats(parse[0].seats);
      setNewSeats(parse[0].seats);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEmail();
    getMovie();
    getHallSchemeData();
    getShowtime();
    getSeats();
  }, []);

  const updateHallScheme = async () => {
    try {
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < newSeats.length; i += 1) {
        // eslint-disable-next-line no-restricted-syntax
        for (let j = 0; j < newSeats[i].length; j += 1) {
          // eslint-disable-next-line eqeqeq
          if (newSeats[i][j] === 2) {
            newSeats[i][j] = 1;
            bookedSeats.push([i, j]);
          }
        }
      }
      const body = { newSeats };
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('token', localStorage.token);

      await fetch(
        `https://cinema-appp.herokuapp.com/booking/hallschemes/${hallScheme.hallscheme_id}`,
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
  const [total, setTotal] = useState(0);
  function onSelectSeat(row, seat) {
    let ttl = showtime.ticket_price * (count + 1);
    if (newSeats !== undefined) {
      if (seats[row][seat] === 1) {
        newSeats[row][seat] = 1;
      } else if (seats[row][seat] === 2) {
        newSeats[row][seat] = 3;
        setCount(count - 1);
        setTotal(ttl);
      } else if (seats[row][seat] === 3) {
        newSeats[row][seat] = 2;
        setCount(count + 1);
        setTotal(ttl);
      } else {
        newSeats[row][seat] = 4;
      }
    }
    setSelectedSeats([row, seat]);
    setNewSeats(newSeats);
  }

  const createReservation = async () => {
    try {
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('token', localStorage.token);
      const shId = showtime.showtime_id;
      const body = { shId, bookedSeats, selectedDate, total };

      await fetch(`https://cinema-appp.herokuapp.com/reservations/${userId} `, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
      });
      toast.success('Билеты оформлены!', {
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  function delay(URL) {
    setTimeout(function () {
      window.location = URL;
    }, 1900);
  }

  function onConfirmBook() {
    updateHallScheme();
    createReservation();
    delay('/');
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
                    minDate={new Date(showtime.start_date)}
                    maxDate={new Date(showtime.end_date)}
                    value={selectedDate}
                    // eslint-disable-next-line no-underscore-dangle
                    onChange={(date) => setSelectedDate(date._d)}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  disabled
                  // select
                  value={showtime.start_at}
                  variant="outlined"
                >
                  {/* {showtime.length > 0 &&
                    showtime.split(',').map((time) => (
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
                      {showtime.ticket_price}
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
                      {showtime.ticket_price * count}
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
                  disabled={count === 0}
                  onClick={() => onConfirmBook()}
                >
                  Подтвердить
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
