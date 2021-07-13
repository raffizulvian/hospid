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

const signup = async ({ firstName, lastName, age, uid, email, password }) => {
  const payload = { firstName, lastName, age, uid, email, password };
  return post('/api/users/signup', payload, { withCredential: true });
};

const getUser = (token) => {
  const user = decode(token, { json: true });
  const { uid, name, age, role, email, loginTime } = user;

  return { uid, name, age, role, email, loginTime };
};

export { login, signup, getUser };
