import axios from 'axios';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../../api';
import { setExerciseCountAC } from '../../state/exerciseReducer';
import styles from './styles.module.css';

export const Exercise = ({
  title,
  count,
  id,
}: {
  title: string;
  count: number;
  id: string;
}) => {
  const [inputValue, setInputValue] = useState(0);
  const [isEditMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.currentTarget.value));
  };
  const onBlurHandler = async () => {
    if (count !== inputValue) {
      try {
        const response = await api.updateExerciseCount(id, inputValue);
        dispatch(
          setExerciseCountAC({ id: id, count: inputValue, name: title })
        );
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.message);
        }
      }
    }
    setEditMode(false);
  };
  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onBlurHandler();
    }
  };
  return (
    <>
      <div className='flex gap-20'>
        <div className='h-6'>
          <span>{title}</span> -{' '}
          {isEditMode ? (
            <input
              className='border border-gray-600 w-10 h-6 text-center'
              type='number'
              onChange={onChangeHandler}
              onKeyDown={onEnter}
              autoFocus
              onBlur={onBlurHandler}
            />
          ) : (
            <span onDoubleClick={() => setEditMode(true)}>{count}</span>
          )}
        </div>
      </div>
      {error && <span className='font-semibold text-red-500'>{error}</span>}
    </>
  );
};
