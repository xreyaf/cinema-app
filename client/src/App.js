import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Dashboard, SignIn, SignUp } from './components';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch('http://localhost:5000/auth/is-verify', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      if (
        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <BrowserRouter>
      <div className="container" />
      <Switch>
        <Route
          exact
          path="/login"
          render={(props) =>
            !isAuthenticated ? (
              <SignIn {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/register"
          render={(props) =>
            !isAuthenticated ? (
              <SignUp {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/dashboard"
          render={(props) =>
            isAuthenticated ? (
              <Dashboard {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </BrowserRouter>
  );
}
