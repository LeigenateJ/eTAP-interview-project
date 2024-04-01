// front/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { 
  Avatar, Button, Container, CssBaseline, TextField, 
  FormControlLabel, Checkbox, Link, Paper, 
  Box, Grid, Typography, Alert, Snackbar, IconButton 
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; // 用于代表老师的图标
import CaregiverIcon from '@mui/icons-material/Face'; // 用于代表监护人的图标
import AccountCircle from '@mui/icons-material/AccountCircle'; // 用户名图标
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // 密码图标
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import '../styles/LoginPage.css'

const theme = createTheme();

export default function LoginPage() {
  const [open, setOpen] = React.useState(false); // Snackbar的状态
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);


  // 处理表单提交
  const handleSubmit = (event) => {
    event.preventDefault();
    // 处理登录逻辑
  };

  // 处理忘记密码点击事件
  const handleForgotPassword = () => {
    setOpen(true); // 打开Snackbar
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  

  // 关闭Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role); // 设置选择的角色
  };

  // 自定义的颜色
  const avatarColors = {
    teacher: selectedRole === 'teacher' ? 'rgb(0, 150, 136)' : 'grey',
    caregiver: selectedRole === 'caregiver' ? 'rgb(255, 193, 7)' : 'grey',
  };
    
  // // 定义一个和谐的颜色
  // const avatarColor = theme.palette.aqua || { main: 'rgb(0, 150, 136)' };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* 调整图片大小的样式 */}
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
          //   // backgroundSize: '600px, auto', // 调整背景图片尺寸以适应容器
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
                bottom: 10, // 根据需要调整
                width: '100%',
                textAlign: 'center', 
                fontWeight: 'bold', 
                color: 'white', // 设置文字颜色为白色
                textTransform: 'uppercase', // 文字大写
                opacity: 1, // 确保文字始终可见，忽略这个如果您想要文字和图片同时渐变
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
            {/* 添加头像 */}
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '80%'}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
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
                autoComplete="current-password"
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
                sx={{ mt: 3, mb: 2, bgcolor: 'rgb(0, 176, 185)' }}
              >
                Sign In
              </Button>
            </Box>
            <Container sx={{ textAlign: 'center' }}>
              {/* 添加点击事件 */}
              <Link href="#" variant="body2" onClick={handleForgotPassword}>
                Forgot password?
              </Link>
            </Container>
          </Box>
        </Grid>
        {/* 弹出提示 */}
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
