import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Footer,
  Container,
  Typography,
  Grid,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
} from '.';

const useStyles = makeStyles((theme) => ({
  table: {
    padding: theme.spacing(0, 0, 4, 0),
  },
  tableRow: {
    height: '64px',
  },
  tableCell: {
    whiteSpace: 'nowrap',
  },
  tableCellInner: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: '3rem',
    textAlign: 'center',
    padding: theme.spacing(10, 0, 2, 0),
  },
  [theme.breakpoints.down('sm')]: {
    fullWidth: { width: '100%' },
  },
}));

const MyTickets = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const getEmail = async () => {
    try {
      const res = await fetch('/dashboard/', {
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
  const [reservations, setReservations] = useState();
  const getReservations = async () => {
    try {
      const res = await fetch(`/reservations/user/${userId}`, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setReservations(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEmail();
    getReservations();
  }, [userId]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h2" color="inherit">
              Билеты пользователя
              {` `}
              {email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer
              component={Container}
              maxWidth="lg"
              className={classes.table}
            >
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Название фильма</TableCell>
                    <TableCell align="left">Дата</TableCell>
                    <TableCell align="left">Время начала</TableCell>
                    <TableCell align="left">Билеты</TableCell>
                    <TableCell align="left">Стоимость билета</TableCell>
                    <TableCell align="left">Итого</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations !== undefined ? (
                    reservations.map((reservation) => (
                      <TableRow className={classes.tableRow} hover>
                        <TableCell className={classes.tableCell}>
                          {reservation.movie_title}
                        </TableCell>

                        <TableCell className={classes.tableCell}>
                          {new Date(reservation.rsd).toLocaleDateString()}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {reservation.start_at}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {reservation.booked_seats.map(
                            (item) => `ряд:${item[0] + 1}
                             место: ${item[1] + 1}; `
                          )}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {reservation.ticket_price}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {reservation.total}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <p>Билетов нет</p>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default MyTickets;
