export type AuthType = { isLoggedIn: boolean };
const initialState: AuthType = {
  isLoggedIn: false,
};

export const authReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'LOG-IN':
      return { ...state, isLoggedIn: action.status };
    default:
      return state;
  }
};

type ActionTypes = ReturnType<typeof logInAC>;

export const logInAC = (status: boolean) => {
  return { type: 'LOG-IN', status } as const;
};