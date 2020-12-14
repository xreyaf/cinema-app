import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Movies, Container, Header, Footer } from '.';

const useStyles = makeStyles((theme) => ({
  movies: {
    marginTop: theme.spacing(1),
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

const Dashboard = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const getEmail = async () => {
    try {
      const res = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setEmail(parseData.user_email);

      setUserId(parseData.user_id);
      console.log(parseData);
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
  return (
    <>
      <CssBaseline />
      <Header userId={userId} email={email} logout={logout} />
      <Container maxWidth="lg" className={classes.movies}>
        <Movies />
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
