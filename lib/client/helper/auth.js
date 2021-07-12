import { decode } from 'jsonwebtoken';

import { ACTIONS } from '../context/AuthContext';
import { post } from '../fetcher';

const login = async (e, uid, password, role, router, dispatch) => {
  e.preventDefault();

  try {
    const { user } = await post(`/api/users/login?role=${role}`, { uid, password });
    dispatch({ type: ACTIONS.UPDATE, payload: { user, loginStatus: 'full' } });
    router.push('/');
  } catch (err) {
    alert('username atau password salah');
  }
};

const signup = () => {};

const getuid = (token) => {
  const { uid } = decode(token, { json: true });
  return uid;
};

const getUser = (token) => {
  const user = decode(token, { json: true });
  return user;
};

export { login, signup, getuid, getUser };
