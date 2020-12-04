import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Toolbar,
  AppBar,
  Typography,
  Slide,
  Menu,
  useScrollTrigger,
  IconButton,
  AccountCircle,
  MenuItem,
  Box,
  Copyright,
  Movies,
  Container,
} from '.';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  user: {
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
  },
}));
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Dashboard = ({ setAuth }, props) => {
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

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={classes.toolbar} position="sticky" color="inherit">
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              Cinema
            </Typography>
            <Typography variant="body1" color="textPrimary" align="center">
              {email}
              {` `}
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="secondary"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Мои билеты</MenuItem>
              <MenuItem onClick={(e) => logout(e)}>Выйти</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          сейчас в прокате
        </Typography>
        <Movies />
      </Container>
      <Box m={1}>
        <Copyright />
      </Box>
    </>
  );
};

export default Dashboard;
