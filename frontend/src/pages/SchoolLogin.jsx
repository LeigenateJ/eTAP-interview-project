import React, { useState } from 'react';
import { 
  Button, TextField, Box, Grid, Typography, Paper, Container, InputAdornment, IconButton
} from '@mui/material';
import eTAPLogo from '../assets/etap-white.png';
import SchoolIcon from '@mui/icons-material/School';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import '../styles/SchoolLoginPage.css'

const SchoolLogin = ({ onSchoolLogin }) => {
  const [schoolLoginName, setSchoolLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // 使用 fetch API 发送 POST 请求到后端
    try {
      const response = await fetch('http://localhost/backend/apis/schoolLogin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: schoolLoginName,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        // 登录成功
        console.log('Login success:', data);
        onSchoolLogin(true); // 通知父组件登录成功
      } else {
        // 登录失败，显示错误信息
        alert(data.message); // 这是简单处理错误消息的方式
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again later.');
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container></div>
  );
};

export default SchoolLogin;