import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    mobile: '',
    city: '',
    qualification: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic (e.g., API call)
    // Pass email and password to login page
    navigate('/login', { state: { email: formData.email, password: formData.password } });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" className="my-4">Sign Up</Typography>
      <form onSubmit={handleSignup} className='forms'>
        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          className="my-2 formfields"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          className="my-2 formfields"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          className="my-2 formfields"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="flex my-2 mobileNumber">
          <FormControl className="mr-2 w-50">
            <InputLabel id="country-code-label">Country Code</InputLabel>
            <Select
              labelId="country-code-label"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              required
            >
              <MenuItem value="+1">+1 (USA)</MenuItem>
              <MenuItem value="+91">+91 (India)</MenuItem>
              <MenuItem value="+44">+44 (UK)</MenuItem>
              {/* Add more country codes as needed */}
            </Select>
          </FormControl>
          <TextField
            label="Mobile"
            name="mobile"
            type="tel"
            fullWidth
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <TextField
          label="City"
          name="city"
          fullWidth
          className="my-2 formfields"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <TextField
          label="Qualification"
          name="qualification"
          fullWidth
          className="my-2 formfields"
          value={formData.qualification}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          className="my-2 formfields"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button variant="contained" color="primary" type="submit" className="my-2 formfields">
          Sign Up
        </Button>
      </form>
      <Button onClick={() => navigate('/login')}>Already have an account? Login</Button>
    </Container>
  );
};

export default Signup;
