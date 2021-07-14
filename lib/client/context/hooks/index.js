import { useContext } from 'react';
import { AuthStateContext, AuthDispatchContext } from '../AuthContext';

const useAuthState = () => useContext(AuthStateContext);
const useAuthDispatch = () => useContext(AuthDispatchContext);

export { useAuthState, useAuthDispatch };
