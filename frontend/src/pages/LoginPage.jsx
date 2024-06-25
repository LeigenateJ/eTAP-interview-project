import React, { useState, useContext } from 'react';
import SchoolLogin from './SchoolLogin';
import UserLogin from './UserLogin';
import { UserContext } from '../contexts/UserContext'; 

const LoginPage = () => {
    const [schoolLoggedIn, setSchoolLoggedIn] = useState(false);
  
    const handleSchoolLogin = (loggedIn) => {
      setSchoolLoggedIn(loggedIn);
    };

  return (
      <div>
        {!schoolLoggedIn ? (
          <SchoolLogin onSchoolLogin={handleSchoolLogin} />
        ) : (
          <UserLogin/>
        )}
      </div>
  );
};

export default LoginPage;
