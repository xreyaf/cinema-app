import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CssBaseline, Footer, Container, Typography, Grid, Button } from '.';

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
  // const [reservations, setReservations] = useState('');
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

  // const getReservations = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:5000/myTickets/${id}`, {
  //       method: 'GET',
  //       headers: { token: localStorage.token },
  //     });

  //     const parseData = await res.json();
  //     setReservations(parseData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  useEffect(() => {
    // getReservations();
    getEmail();
  }, []);

  function createData(movieTitle, date, startAt, ticketPrice, total) {
    return { movieTitle, date, startAt, ticketPrice, total };
  }

  const reservations = [
    createData('Джокер', '2020-12-07 00:00:00', '13:30', 120, 360),
    createData('Достать ножи', '2020-12-07 00:00:00', '13:30', 120, 360),
    createData('Паразиты', '2020-12-07 00:00:00', '13:30', 120, 360),
    createData('Кролик ДжоДжо', '2020-12-07 00:00:00', '13:30', 120, 360),
    createData('Джентельмены', '2020-12-07 00:00:00', '13:30', 120, 360),
  ];

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
                    <TableCell align="left">Стоимость билета</TableCell>
                    <TableCell align="left">Итого</TableCell>
                    <TableCell align="left" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow className={classes.tableRow} hover>
                      <TableCell className={classes.tableCell}>
                        {reservation.movieTitle}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {new Date(reservation.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {reservation.startAt}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {reservation.ticketPrice}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {reservation.total}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Button disabled>Отменить</Button>
                      </TableCell>
                    </TableRow>
                  ))}
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
