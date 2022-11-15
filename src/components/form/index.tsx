import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../api';
import { AppType, saveLoginData } from '../../state/appReducer';
import { AppRootStateType } from '../../state/store';
import styles from './styles.module.css';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSent, setSent] = useState(false);
  const [error, setError] = useState(true);

  const dispatch = useDispatch();
  const app = useSelector<AppRootStateType, AppType>(state => state.app);
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setSent(false);
    setEmail(event.currentTarget.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setSent(false);
    setPassword(event.currentTarget.value);
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setSent(false);
    setName(event.currentTarget.value);
  };

  const onSubmitHandler = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailValue = email.trim();
    const passwordValue = password.trim();
    const nameValue = name.trim();

    if (emailValue !== '' && passwordValue !== '' && nameValue !== '') {
      try {
        const response = await api.register(
          nameValue,
          emailValue,
          passwordValue
        );
        console.log(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error.message);
          setError(true);
        }
      } finally {
        setSent(true);
        setEmail('');
        setPassword('');
        setName('');
      }
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h1 className={styles.title}>Registration</h1>
        <input
          value={name}
          onChange={onChangeName}
          className={styles.input}
          placeholder='name'
          type='text'
        />
        <input
          value={email}
          onChange={onChangeEmail}
          className={styles.input}
          placeholder='email'
          type='text'
        />
        <input
          value={password}
          onChange={onChangePassword}
          className={styles.input}
          placeholder='password'
          type='password'
        />
        <button className={styles.button}>Send</button>
      </form>
      {isSent && (
        <div className={styles.success_block}>
          {error ? (
            <span className={styles.error_message}>ERROR</span>
          ) : (
            <span className={styles.success_message}>
              REGISTRATION SUCCESS!
            </span>
          )}
        </div>
      )}
    </>
  );
};
