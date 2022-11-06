import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logInAC } from '../../state/authReducer';
import styles from './styles.module.css';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSent, setSent] = useState(false);
  const [error, setError] = useState<null | string>('');
  const navigate = useNavigate();
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSent(false);
    setPassword(event.currentTarget.value);
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSent(false);
    setName(event.currentTarget.value);
  };

  const onSubmitHandler = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const passwordValue = password.trim();
    const nameValue = name.trim();

    if (passwordValue !== '' && nameValue !== '') {
      fetch('http://192.168.0.105:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: passwordValue,
          name: nameValue,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 200) {
            navigate('/profile');
            localStorage.setItem('auth', 'true');
            dispatch(logInAC(true));
          } else return Promise.reject(data);
        })
        .catch(error => {
          setError(error.message);
        });
      setPassword('');
      setName('');
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h1 className={styles.title}>Login</h1>
        <input
          value={name}
          onChange={onChangeName}
          className={styles.input}
          placeholder='name'
          type='text'
        />
        <input
          value={password}
          onChange={onChangePassword}
          className={styles.input}
          placeholder='password'
          type='password'
        />
        <button className={styles.button}>Log In</button>
      </form>
      {error && (
        <div className={styles.success_block}>
          <span className={styles.error_message}>{error}</span>
        </div>
      )}
    </>
  );
};