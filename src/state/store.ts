import { combineReducers, createStore } from 'redux';
import { appReducer } from './appReducer';
import { authReducer } from './authReducer';
import { exerciseReducer } from './exerciseReducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  exercise: exerciseReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;
