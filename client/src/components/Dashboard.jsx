import React from 'react';
import { Typography, Button } from '.';

const Dashboard = ({ setAuth }) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Dashboard
      <Button onClick={() => setAuth(false)}>Logout</Button>
    </Typography>
  );
};
export default Dashboard;
