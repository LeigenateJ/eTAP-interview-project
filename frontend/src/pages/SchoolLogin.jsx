import React, { useState } from 'react';
import { 
  Button, TextField, Box, Grid, Typography, Paper, Container, InputAdornment, IconButton
} from '@mui/material';
import eTAPLogo from '../assets/etap-white.png';
import SchoolIcon from '@mui/icons-material/School';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import '../styles/SchoolLoginPage.css'
import { useUser } from '../contexts/UserContext';

const ErrorAlert = ({ message, onClose }) => {
  return (
    <Paper variant="outlined" sx={{ borderColor: 'error.main', bgcolor: 'background.paper', p: 1, mb: 2, display: 'flex', alignItems: 'center' }}>
      <WarningAmberOutlinedIcon color="error" />
      <Typography variant="body2" sx={{ ml: 1, flexGrow: 1, color: 'error.dark' }}>
        {message}
      </Typography>
      <IconButton onClick={onClose}>
        <CancelOutlinedIcon fontSize="inherit" color="error" />
      </IconButton>
    </Paper>
  );
};

const SchoolLogin = ({ onSchoolLogin }) => {
  const [schoolLoginName, setSchoolLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ schoolLoginName: '', password: '' });
  const { loginSchool } = useUser();
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const validateForm = () => {
    const newErrors = { schoolLoginName: '', password: '' };
    let isValid = true;

    if (!schoolLoginName.trim()) {
      newErrors.schoolLoginName = 'School Login Name is required';
      isValid = false;
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;
  
    const success = await loginSchool(schoolLoginName, password);
  
    if (success) {

        console.log('Login successed');
        onSchoolLogin(true); 
    } else {

        console.log('Login failed:');
        setShowErrorAlert(true);

    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='sch-login-bg'>
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-60px'}}>
        <img src={eTAPLogo} alt="eTAP" style={{ width: '200px', marginBottom: '20px' }} />
        <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'rgb(0, 176, 185)' }}>
          School Login
        </Typography>
        {showErrorAlert && (
            <ErrorAlert
              message="You have entered an incorrect school name or password."
              onClose={() => setShowErrorAlert(false)}
            />
          )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="school-login-name"
            label="School Login Name"
            name="schoolLoginName"
            autoComplete="school-login-name"
            autoFocus
            value={schoolLoginName}
            placeholder="School Login Name"
            onChange={(e) => setSchoolLoginName(e.target.value)}
            error={!!errors.schoolLoginName}
            helperText={errors.schoolLoginName}
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SchoolIcon />
                </InputAdornment>
                ),
            }}
            />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            placeholder="Password"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <LockOutlinedIcon />
                </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                ),
            }}
        />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 , bgcolor: 'rgb(0, 176, 185)'}}
          >
            Log In
          </Button>
        </Box>
      </Paper>
    </Container></div>
  );
};

export default SchoolLogin;
