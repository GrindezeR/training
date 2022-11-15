import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthType } from '../../state/authReducer';
import { ExerciseType, setExerciseDataAC } from '../../state/exerciseReducer';
import { AppRootStateType } from '../../state/store';
import { Exercise } from '../exercise';
import styles from './styles.module.css';

export const Profile = () => {
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const authData = useSelector<AppRootStateType, AuthType>(state => state.auth);
  const exerciseData = useSelector<AppRootStateType, ExerciseType[]>(
    state => state.exercise
  );
  useEffect(() => {
    if (authData.isLoggedIn) {
      fetch(`http://192.168.0.104:3000/api/exercises/?id=${authData.user_id}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 200) {
            console.log(data.result)
            dispatch(setExerciseDataAC(data.result));
          } else {
            return Promise.reject(data);
          }
        })
        .catch(error => {
          setError(error.message);
        });
    }
  }, [authData.isLoggedIn]);
  const onAddExerciseHandler = () => {};
  const onChangeExerciseHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <div className='flex flex-col gap-4 mx-10 my-10'>
      <h1 className='font-semibold text-2xl'>Exercises</h1>
      {error && <span className='text-red-500 font-semibold'>{error}</span>}
      {exerciseData.map(item => {
        return (
          <Exercise
            key={item.id}
            title={item.name}
            count={item.count}
            id={item.id}
          />
        );
      })}

      <input
        type='text'
        className='border border-gray-600 w-40 px-2'
        value={inputValue}
        onChange={onChangeExerciseHandler}
      />
      <button
        className='border border-gray-600 w-fit px-4 py-1'
        onClick={onAddExerciseHandler}>
        Add exercises
      </button>
    </div>
  );
};
