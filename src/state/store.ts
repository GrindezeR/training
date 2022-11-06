import { combineReducers, createStore } from 'redux';
import { appReducer } from './appReducer';
import { authReducer } from './authReducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;
