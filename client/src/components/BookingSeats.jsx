import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Box } from '.';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  seat: {
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.7)',
    borderRadius: 2,
    padding: theme.spacing(2),
    margin: theme.spacing(0.5),
    fontWeight: 600,
    '&:hover': {
      background: 'rgb(56, 142, 60)',
    },
  },
  seatInfoContainer: {
    width: '50%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  seatInfo: { marginRight: theme.spacing(2) },
  seatInfoLabel: {
    borderRadius: '10px',
    marginRight: theme.spacing(1),
    display: 'inline-block',
    width: 13,
    height: 13,
  },
  screen: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '48px',
    padding: '1px 0',
    width: 700,
    height: 20,
    backgroundColor: 'rgb(65,66,70)',
    borderRadius: '8px',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  [theme.breakpoints.down('sm')]: {
    seat: { padding: theme.spacing(1.2), margin: theme.spacing(0.5) },
    seatInfoContainer: { width: '100%', display: 'block' },
    seatInfo: { marginTop: theme.spacing(2) },
    screen: {
      marginTop: '24px',
      padding: '1px 0',
      width: 500,
    },
  },
}));

export default function BookingSeats(props) {
  const classes = useStyles(props);

  const [seats, setSeats] = useState('');

  const [selectedSeats, setSelectedSeats] = useState('');

  const { id } = useParams();
  let newSeats = [1];
  let count = 0;

  function onSelectSeat(row, seat) {
    if (seats.length !== 0) {
      newSeats = [...seats];

      if (seats[row][seat] === 1) {
        newSeats[row][seat] = 1;
      } else if (seats[row][seat] === 2) {
        newSeats[row][seat] = 3;
      } else if (seats[row][seat] === 3) {
        newSeats[row][seat] = 2;
      } else {
        newSeats[row][seat] = 4;
      }
      setSelectedSeats([row, seat]);
      seats[row][seat] = newSeats[row][seat];
      setSeats(seats);
      console.log(seats);
      console.log(selectedSeats);
      count = 1;
    }
  }
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
    getSeats();
  }, []);

  useEffect(() => {
    onSelectSeat();
  }, [count]);

  return (
    <>
      <Box className={classes.screen}>Экран</Box>
      <Box width={1} pt={2}>
        {seats.length > 0 &&
          seats.map((seatRows, indexRow) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={indexRow} className={classes.row}>
              {seatRows.map((seat, index) => (
                <Box
                  // eslint-disable-next-line react/no-array-index-key
                  key={`seat-${index}`}
                  onClick={() => onSelectSeat(indexRow, index)}
                  className={classes.seat}
                  bgcolor={
                    // eslint-disable-next-line no-nested-ternary
                    seat === 1
                      ? 'rgb(65, 66, 70)'
                      : // eslint-disable-next-line no-nested-ternary
                      seat === 2
                      ? 'rgb(56, 142, 60)'
                      : seat === 3
                      ? 'rgb(96, 93, 169)'
                      : 'rgb(211, 47, 47)'
                  }
                >
                  {index + 1}
                </Box>
              ))}
            </div>
          ))}
      </Box>
      <Box width={1} mt={4}>
        <div className={classes.seatInfoContainer}>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(96, 93, 169)' }}
            />
            Свободное место
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(65, 66, 70)' }}
            />
            Забронированное место
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(56, 142, 60)' }}
            />
            Выбранное место
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(211, 47, 47)' }}
            />
            Недоступное место
          </div>
        </div>
      </Box>
    </>
  );
}
