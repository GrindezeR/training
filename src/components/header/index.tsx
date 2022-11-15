import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logInAC } from '../../state/authReducer';
import { AppRootStateType } from '../../state/store';
import styles from './styles.module.css';

export const Header = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    state => state.auth.isLoggedIn
  );
  const user_id = useSelector<AppRootStateType, string>(
    state => state.auth.user_id
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogOutClick = () => {
    localStorage.setItem('auth', 'false');
    localStorage.setItem('id', '');
    dispatch(logInAC(false, ''));
    navigate('/');
  };
  const profileClick = () => {};
  return (
    <div className={styles.header}>
      <ul className={styles.navbar}>
        <Link to={'/'} className={styles.nav_item}>
          Home
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              to={`/profile/?id=${user_id}`}
              onClick={profileClick}
              className={styles.nav_item}>
              Profile
            </Link>
            <button onClick={onLogOutClick} className={styles.nav_item}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={'/register'} className={styles.nav_item}>
              Register
            </Link>
            <Link to={'/login'} className={styles.nav_item}>
              Login
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};
