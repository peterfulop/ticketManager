import jwtDecode, { JwtPayload } from 'jwt-decode';
import { createContext, useReducer } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

type InitialState = {
  user: User;
  token: string;
};

enum Action {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type ActionTypes = {
  type: Action;
  payload?: {
    user: User;
    token: string;
  };
};

const initialState: InitialState = {
  user: {
    id: '',
    name: '',
    email: '',
  },
  token: '',
};

const token = localStorage.getItem('token');

if (token) {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (decodedToken && Number(decodedToken?.exp) * 1000 > Date.now()) {
      initialState.token = String(decodedToken);
    } else {
      localStorage.removeItem('token');
    }
  } catch (error) {
    localStorage.removeItem('token');
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData: InitialState) => {},
  logout: () => {},
});

function authReducer(state: InitialState, action: ActionTypes): InitialState {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: String(action.payload?.token),
        user: {
          email: action.payload?.user.email,
          id: action.payload?.user.id,
        } as User,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: InitialState) => {
    localStorage.setItem('token', userData.token);
    dispatch({ type: Action.LOGIN, payload: { ...userData } });
  };

  const logout = () => {
    localStorage.remove('token');
    dispatch({ type: Action.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
