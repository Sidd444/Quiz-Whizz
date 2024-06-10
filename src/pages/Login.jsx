import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState(location.state?.password || '');
  const [open, setOpen] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Validate email and password (e.g., API call)
    // For demonstration, assume any email/password is valid
    if (email === 'test@example.com' && password === 'password') {
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" className="my-4">Login</Typography>
      <form onSubmit={handleLogin} className='forms'>
        <TextField
          label="Email"
          type="email"
          fullWidth
          className="my-2 formfields"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          className="my-2 formfields"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit" className="my-2 formfields">
          Login
        </Button>
      </form>
      <Button onClick={() => setOpen(true)}>Forgot Password?</Button>
      <Button onClick={() => navigate('/signup')}>Create New Account</Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address. We will send you an email to reset your password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleForgotPassword}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Login;
