import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authReducer';

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!document.getElementById('otpless-sdk')) {
      const script = document.createElement('script');
      script.id = 'otpless-sdk';
      script.type = 'text/javascript';
      script.src = 'https://otpless.com/v2/auth.js';
      script.setAttribute('data-appid', 'ATNO2NFNEZMG1HTD5LPQ');
      document.body.appendChild(script);
    }

    window.otpless = (otplessUser) => {
      handleOtplessUser(otplessUser);
    };
  }, []);

  const handleOtplessUser = (otplessUser) => {
    fetch('http://localhost:3000/server/auth/otpless', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(otplessUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch(loginSuccess(data.user, data.token));
          navigate('/profile');
        } else {
          console.error('Authentication failed', data);
        }
      });
  };

  return (
    <div>
      <div id="otpless-login-page"></div>
    </div>
  );
}
