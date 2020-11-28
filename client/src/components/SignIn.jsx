import React from 'react';
import { Typography, Button } from '.';

const SignIn = ({ setAuth }) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      SignIn
      <Button onClick={() => setAuth(true)}>Auth</Button>
    </Typography>
  );
};
export default SignIn;
