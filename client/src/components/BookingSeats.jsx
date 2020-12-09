import React from 'react';
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
      background: 'rgb(120, 205, 4)',
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
    borderRadius: '2px',
    marginRight: theme.spacing(1),
    display: 'inline-block',
    width: 13,
    height: 13,
  },

  [theme.breakpoints.down('sm')]: {
    seat: { padding: theme.spacing(1.2), margin: theme.spacing(0.5) },
    seatInfoContainer: { width: '100%', display: 'block' },
    seatInfo: { marginTop: theme.spacing(2) },
  },
}));

export default function BookingSeats(props) {
  const classes = useStyles(props);
  // const seats = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <>
      <Box
        style={{
          margin: 'auto',
          padding: '1px 0',
          width: 500,
          height: 20,
          backgroundColor: 'rgb(65,66,70)',
          borderRadius: '8px',
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
      >
        Экран
      </Box>
      <Box width={1} pt={15}>
        {/* {seats.length > 0 &&
          seats.map((seatRows) => (
            <div className={classes.row}>
              {seatRows.map((seat, index) => (
                <Box
                  className={classes.seat}
                  bgcolor={
                    // eslint-disable-next-line no-nested-ternary
                    seat === 1
                      ? 'rgb(65, 66, 70)'
                      : // eslint-disable-next-line no-nested-ternary
                      seat === 2
                      ? 'rgb(120, 205, 4)'
                      : seat === 3
                      ? 'rgb(14, 151, 218)'
                      : 'rgb(96, 93, 169)'
                  }
                >
                  {index + 1}
                </Box>
              ))}
            </div>
          ))} */}
      </Box>
      <Box width={1} mt={10}>
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
              style={{ background: 'rgb(120, 205, 4)' }}
            />
            Выбранное место
          </div>
        </div>
      </Box>
    </>
  );
}
