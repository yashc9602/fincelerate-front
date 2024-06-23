import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authReducer';

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      dispatch(loginSuccess(user, token));
    }
  }, [dispatch]);

  return children;
};

export default AuthLoader;
