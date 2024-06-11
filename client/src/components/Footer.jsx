import React from 'react';
import { Box, Typography, Link, makeStyles } from '@mui/material';


const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(4),
    textAlign: 'center',
    marginTop: 'auto',
  },
}));

const Footer = () => {
  const classes = useStyles();


  return (
    <Box component="footer" className={classes.footer}>
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} Quiz Whizz. All rights reserved.
      </Typography>
      <Typography variant="body2">
        Created with ❤️ by <Link href="https://github.com/Sidd444">Dayanand</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
