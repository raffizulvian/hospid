import { createContext } from 'react';

const ACTIONS = {
  UPDATE: 'update',
  CLEAR: 'clear',
};

const initialState = {
  user: null,
  loginStatus: 'no',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE:
      return { user: action.payload.user, loginStatus: action.payload.loginStatus };

    case ACTIONS.CLEAR:
      return { user: null, loginStatus: 'no' };

    default:
      return state;
  }
};

const AuthStateContext = createContext(initialState);
const AuthDispatchContext = createContext(() => {});

export { AuthStateContext, AuthDispatchContext, ACTIONS, initialState, reducer };
