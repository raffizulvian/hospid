import PropTypes from 'prop-types';
import { useReducer } from 'react';

import {
  AuthStateContext,
  AuthDispatchContext,
  reducer,
  initialState,
} from '../../lib/client/context/AuthContext';

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>{children}</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
}

AuthProvider.propTypes = { children: PropTypes.object.isRequired };

export default AuthProvider;
