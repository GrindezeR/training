export type AppType = {
  email: string;
  password: string;
  name: string;
};

const initialState: AppType = {
  email: '',
  password: '',
  name: '',
};

export const appReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'SAVE-AUTH':
      return {
        ...state,
        email: action.email,
        password: action.password,
        name: action.name,
      };
    default:
      return state;
  }
};

export type ActionTypes = ReturnType<typeof saveLoginData>;

export const saveLoginData = (
  email: string,
  password: string,
  name: string
) => {
  return { type: 'SAVE-AUTH', email, password, name } as const;
};
