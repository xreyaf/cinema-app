import React from 'react';

import { Typography, Link, Container } from '.';

export default function Copyright() {
  return (
    <Container>
      <Typography variant="body2" color="textSecondary" align="center">
        CINEMA APP
        {` `}
        {`© `}
        {new Date().getFullYear()}
        {` `}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link
          href="http://bmstu-kaluga.ru/"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          BMSTU KALUGA
        </Link>
        {` `}
        <Link
          href="https://vk.com/eic5_kb"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          IPS
        </Link>
        {` `}
        <Link
          href="https://github.com/xreyaf"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          XREYAF
        </Link>
      </Typography>
    </Container>
  );
}
