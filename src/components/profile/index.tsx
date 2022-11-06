import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppType } from '../../state/appReducer';
import { AuthType } from '../../state/authReducer';
import { AppRootStateType } from '../../state/store';
import styles from './styles.module.css';

type Profile = {
  user_id: string;
  push_ups: number;
  pull_ups: number;
  sit_ups: number;
  running: number;
};

export const Profile = () => {
  const [userData, setUserData] = useState<Profile>();
  const isAuth = useSelector<AppRootStateType, boolean>(
    state => state.auth.isLoggedIn
  );
  const { user_id } = useParams();
console.log(isAuth);

  useEffect(() => {
    if (isAuth) {
      fetch(`http://192.168.0.105:3000/api/profile/?id=${user_id}`)
        .then(res => res.json())
        .then(data => {
          setUserData(data);
        });
    }
  }, [isAuth]);

  if (!userData) return null;

  const { push_ups, pull_ups, sit_ups, running } = userData;
  console.log(userData);

  return (
    <div className='flex flex-col gap-4'>
      <h1>Status</h1>
      {push_ups && <span>Отжуманя: {push_ups}</span>}
      {pull_ups && <span>Подтягиваня: {pull_ups}</span>}
      {sit_ups && <span>Приседаня: {sit_ups}</span>}
      {running && <span>Беганя: {running}</span>}
    </div>
  );
};
