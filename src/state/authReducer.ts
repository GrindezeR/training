export type AuthType = { isLoggedIn: boolean; user_id: string };
const initialState: AuthType = {
  isLoggedIn: false,
  user_id: '',
};

export const authReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'LOG-IN':
      return { ...state, isLoggedIn: action.status, user_id: action.user_id };
    default:
      return state;
  }
};

type ActionTypes = ReturnType<typeof logInAC>;

export const logInAC = (status: boolean, user_id: string) => {
  return { type: 'LOG-IN', status, user_id } as const;
};
