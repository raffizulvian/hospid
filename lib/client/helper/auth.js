import { decode } from 'jsonwebtoken';

import { ACTIONS } from '../context/AuthContext';
import { post } from '../fetcher';

const login = async (e, uid, password, role, router, dispatch) => {
  e.preventDefault();

  try {
    const { user } = await post(`/api/users/login?role=${role}`, { uid, password });
    dispatch({ type: ACTIONS.UPDATE, payload: { user, loginStatus: 'full' } });

    if (role === 'patient') {
      router.push('/dashboard');
    }

    if (role === 'admin') {
      router.push('/admin');
    }
  } catch (err) {
    alert('username atau password salah');
  }
};

const signup = async ({ firstName, lastName, age, uid, email, password }) => {
  const payload = { firstName, lastName, age, uid, email, password };
  return post('/api/users/signup', payload, { withCredentials: true });
};

const logout = async (uid, router, dispatch) => {
  try {
    await post('/api/users/logout', { uid }, { withCredentials: true });
    dispatch({ type: ACTIONS.CLEAR });
    router.push('/');
  } catch (err) {
    alert('Gagal logout');
  }
};

const getUser = (token) => {
  const user = decode(token, { json: true });
  const { uid, name, age, role, email, loginTime } = user;

  return { uid, name, age, role, email, loginTime };
};

export { login, signup, logout, getUser };
