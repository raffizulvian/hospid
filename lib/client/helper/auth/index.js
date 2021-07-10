import { post } from '../../fetcher';

const login = async (e, uid, password, role, router) => {
  e.preventDefault();
  const status = await post(`/api/users/login?role=${role}`, { uid, password });

  if (status === 200) {
    router.push('/');
  } else {
    alert('username atau password salah');
  }
};

const signup = () => {};

export { login, signup };
