
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Avatar, Button, Container, CssBaseline, TextField, 
  FormControlLabel, Checkbox, Link, Paper, 
  Box, Grid, Typography, Alert, Snackbar, IconButton 
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CaregiverIcon from '@mui/icons-material/Face';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { useUser } from '../contexts/UserContext';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import '../styles/LoginPage.css'

const theme = createTheme();

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

export default function UserLogin() {
  const [open, setOpen] = React.useState(false); // Snackbar state
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    role: '',
    username: '',
    password: '',
  });
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const errors = { role: '', username: '', password: '' };

    if (!selectedRole) {
      errors.role = 'Please select a role.';
      isValid = false;
    }

    if (!username.trim()) {
      errors.username = 'Please enter your username.';
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = 'Please enter your password.';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const success = await loginUser(username, password, selectedRole);
    if (success) {
      // successed
      console.log('Logged in successfully');
      navigate('/board');
    } else {
      //failed
      console.log('Failed to login');
      setShowErrorAlert(true);
    }
  };

  
  const handleForgotPassword = () => {
    setOpen(true); // open Snackbar
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  

  // close Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role); 
  };

  // customized color
  const avatarColors = {
    teacher: selectedRole === 'teacher' ? 'rgb(0, 150, 136)' : 'grey',
    caregiver: selectedRole === 'caregiver' ? 'rgb(255, 193, 7)' : 'grey',
  };
    
  // 
  // const avatarColor = theme.palette.aqua || { main: 'rgb(0, 150, 136)' };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* adjust image size*/}
        <Grid
          item
          xs={12}
          sm={7}
          md={7}
          className="left-side-bg"
          // sx={{
          //   // backgroundImage: `url(${logoImage})`,
          //   // backgroundRepeat: 'no-repeat',
          //   // // backgroundColor: (t) =>
          //   // //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          //   // backgroundSize: '600px, auto', // 
          //   // backgroundPosition: 'center',
          //   backgroundColor: 'rgb(0, 176, 185)',
          //   position: 'relative',
          // }}
        >
        <div className="left-side">
          <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                position: 'absolute', 
                bottom: 10,
                width: '100%',
                textAlign: 'center', 
                fontWeight: 'bold', 
                color: 'white', 
                textTransform: 'uppercase',
                opacity: 1,
              }}
            >
              School Management System
            </Typography>
        </div>
        </Grid>
        <Grid item xs={12} sm={5} md={5}  component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{mb: 4, fontWeight: 'bold', color: 'rgb(0, 176, 185)' }}>
              Sign into your account
            </Typography>
            <Typography component="p" variant="subtitle1" sx={{ my: 1, color: 'grey.800' }}>
              I am
            </Typography>
            {/* choose login type by avatar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 2 }}>
                <Avatar sx={{ bgcolor: avatarColors.teacher, cursor: 'pointer' }} onClick={() => handleRoleSelect('teacher')}>
                  <SchoolIcon />
                </Avatar>
                <Typography variant="caption" sx={{ mt: 1, color: selectedRole === 'teacher' ? 'grey.800' : 'grey.400' }}>Teacher</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 2 }}>
                <Avatar sx={{ bgcolor: avatarColors.caregiver, cursor: 'pointer' }} onClick={() => handleRoleSelect('caregiver')}>
                  <CaregiverIcon />
                </Avatar>
                <Typography variant="caption" sx={{ mt: 1, color: selectedRole === 'caregiver' ? 'grey.800' : 'grey.400' }}>Caregiver</Typography>
              </Box>
            </Box>
            <Typography color="error">{error.role}</Typography>
            {showErrorAlert && (
            <ErrorAlert
              message="You have entered an incorrect username name or password."
              onClose={() => setShowErrorAlert(false)}
            />
          )}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '80%'}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                placeholder="Username"
                error={!!error.username}
                helperText={error.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                autoComplete="current-password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                error={!!error.password}
                helperText={error.password}
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'rgb(0, 176, 185)', 
                '&:hover': {
                  bgcolor: 'rgb(0, 196, 205)', 
                },
                '&:active': {
                  bgcolor: 'rgb(0, 156, 165)'} }}
              >
                Log In
              </Button>
            </Box>
            <Container sx={{ textAlign: 'center' }}>
              <Link href="#" variant="body2" onClick={handleForgotPassword}>
                Forgot password?
              </Link>
            </Container>
          </Box>
        </Grid>

        <Snackbar 
          open={open} 
          autoHideDuration={6000} 
          onClose={handleClose} 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            Contact support@etap.co.nz if you require help.
          </Alert>
        </Snackbar>
      </Grid>
    </ThemeProvider>
  );
}
