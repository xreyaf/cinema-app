import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CssBaseline, Toolbar, AppBar, Typography, Link, Button, Box } from '.';

const useStyles = makeStyles((theme) => ({
  appbar: {},
  appbarWrapper: {
    width: '80vw',
    margin: '0 auto',
    background: 'none !important',
  },
  appbarTitle: {
    flexGrow: 1,
    color: theme.palette.primary.light,
  },
  menu: {
    padding: '0 1rem 0 0 ',
  },
  menuItem: {
    padding: '0 1rem',
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { userId, logout } = props;

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" color="inherit">
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            <Link href="/" color="inherit" style={{ textDecoration: 'none' }}>
              CINEMA
            </Link>
          </h1>
          <Box display="flex" className={classes.menu}>
            <Typography
              className={classes.menuItem}
              variant="h6"
              color="textPrimary"
              align="center"
            >
              <Link
                href="/"
                color="inherit"
                style={{
                  textDecoration: 'none',
                }}
              >
                Главная
              </Link>
            </Typography>
            <Typography
              className={classes.menuItem}
              variant="h6"
              color="textPrimary"
              align="center"
            >
              <Link
                href={`/dashboard/myTickets/${userId}`}
                color="inherit"
                style={{ textDecoration: 'none' }}
              >
                Мои билеты
              </Link>
            </Typography>
          </Box>
          <Button
            style={{
              maxWidth: '100px',
              minWidth: '100px',
              borderRadius: 20,
            }}
            variant="contained"
            color="primary"
            onClick={(e) => logout(e)}
          >
            <Typography variant="h7" align="center">
              Выйти
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

Header.propTypes = {
  userId: PropTypes.string.isRequired,
};
