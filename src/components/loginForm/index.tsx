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
      fetch('http://192.168.0.104:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameValue,
          password: passwordValue,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 200) {
            console.log(data);
            navigate(`/profile/?id=${data.user_id}`);
            localStorage.setItem('auth', 'true');
            localStorage.setItem('id', data.user_id);
            dispatch(logInAC(true, data.user_id));
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
