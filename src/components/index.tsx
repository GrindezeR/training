import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { logInAC } from '../state/authReducer';
import { Form } from './form';
import { Header } from './header';
import { Home } from './home';
import { LoginForm } from './loginForm';
import { Profile } from './profile';

export const Page = () => {
  const isLogIn = localStorage.getItem('auth') === 'true';

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logInAC(isLogIn));
  }, [isLogIn]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Form />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/profile/:userId?' element={<Profile />} />
      </Routes>
    </>
  );
};
