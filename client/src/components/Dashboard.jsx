import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Container, CssBaseline, Button, Grid } from '.';

const Dashboard = ({ setAuth }) => {
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
      toast.success('Возвращайтесь скорее!', {
        position: 'bottom-right',
        autoClose: 2800,
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

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Typography variant="h3" color="textPrimary" align="left">
        Здесь скоро можно будет купить билеты
      </Typography>
      <Typography variant="body1" color="textPrimary" align="center">
        Ваш email:
        {email}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={(e) => logout(e)}
          >
            Выйти
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
