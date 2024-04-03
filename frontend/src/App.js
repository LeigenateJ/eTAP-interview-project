import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SchoolLogin from './pages/SchoolLogin';
import LoginPage from './pages/LoginPage'

const App = () => {
  const [schoolLoggedIn, setSchoolLoggedIn] = useState(false);

  const handleSchoolLogin = (loggedIn) => {
    setSchoolLoggedIn(loggedIn);
  };

  return (
    <div>
      {!schoolLoggedIn ? (
        <SchoolLogin onSchoolLogin={handleSchoolLogin} />
      ) : (
        <LoginPage /> // 或其他组件，取决于用户登录到学校后应该看到的内容
      )}
    </div>
  );
};

export default App;
