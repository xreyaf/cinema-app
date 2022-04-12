import React, { useEffect, useState } from 'react';
import { CssBaseline, Movies, Header, Footer } from '.';

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

  return (
    <>
      <CssBaseline />
      <Header userId={userId} email={email} logout={logout} />
      <Movies />
      <Footer />
    </>
  );
};

export default Dashboard;
