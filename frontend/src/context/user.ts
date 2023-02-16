import { createContext } from 'react';

export const DEFAULT_USER = null;

export const DEFAULT_TOKEN = '';

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IUserState {
  user: IUser | null;
  token: string;
}

export interface IUserActions {
  type: 'login' | 'logout';
  payload: IUserState;
}

export const initialUserState: IUserState = {
  user: DEFAULT_USER,
  token: DEFAULT_TOKEN,
};

export const userReducer = (state: IUserState, action: IUserActions) => {
  let user = action.payload.user;
  let token = action.payload.token;

  switch (action.type) {
    case 'login':
      localStorage.setItem('token', token);
      return { user, token };
    case 'logout':
      localStorage.removeItem('token');
      return initialUserState;
    default:
      return state;
  }
};

export interface IUserContextProps {
  userState: IUserState;
  userDispatch: React.Dispatch<IUserActions>;
}

const UserContext = createContext<IUserContextProps>({
  userState: initialUserState,
  userDispatch: () => {},
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;

export default UserContext;
