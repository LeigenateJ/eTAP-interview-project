import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({
        school_id: null,
        school_name: '',
        user_id: null,
        user_type: '',
        user_name: '',
        details: [],
    });

    //school login
    const loginSchool = async (schoolLoginName, password) => {
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
                // update context
                setUserInfo((prevState) => ({
                    ...prevState,
                    school_id: data.school_id,
                    school_name: data.name,
                }));
                return true; // successed
            } else {
                console.log(data.message);
                return false; // failed
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred. Please try again later.');
            return false; // failed
        }
    };

    // user login
    const loginUser = async (username, password, userType) => {
        try {
          const response = await fetch('http://localhost/backend/apis/userLogin.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              username,
              password,
              user_type: userType,
              school_id: userInfo.school_id,
            }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setUserInfo((prevInfo) => ({
              ...prevInfo,
              school_id: data.school_id,
              school_name: data.name,
              user_id: data.user_id,
              user_type: userType,
              user_name: data.name,
              details: data.details,
            }));
            console.log('Login success:', data);
            return true;
          } else {
            throw new Error(data.message || 'Login failed');
          }
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
    };


    return (
        <UserContext.Provider value={{ userInfo, loginSchool, loginUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook
export const useUser = () => useContext(UserContext);
