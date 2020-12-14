import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  CssBaseline,
  Toolbar,
  AppBar,
  Typography,
  Menu,
  IconButton,
  AccountCircle,
  MenuItem,
  Link,
} from '.';

const useStyles = makeStyles(() => ({
  toolbar: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  user: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { email, userId, logout } = props;

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

      <AppBar className={classes.toolbar} position="sticky" color="inherit">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            <Link href="/" color="inherit" style={{ textDecoration: 'none' }}>
              Cinema
            </Link>
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
            color="primary"
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
            <Link
              href={`/dashboard/myTickets/${userId}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <MenuItem>Мои билеты</MenuItem>
            </Link>
            <MenuItem onClick={(e) => logout(e)}>Выйти</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

Header.propTypes = {
  email: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
