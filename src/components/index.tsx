import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { logInAC } from '../state/authReducer';
import { AppRootStateType } from '../state/store';
import { Form } from './form';
import { Header } from './header';
import { Home } from './home';
import { LoginForm } from './loginForm';
import { Profile } from './profile';

export const Page = () => {
  const isLogIn = localStorage.getItem('auth') === 'true';
  const user_id = localStorage.getItem('id') ?? '';

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logInAC(isLogIn, user_id));
  }, [isLogIn]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Form />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
};
