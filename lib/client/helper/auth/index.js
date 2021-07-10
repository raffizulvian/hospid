import { post } from '../../fetcher';

const login = async (e, uid, password, role, router, setCurrentUser) => {
  e.preventDefault();

  try {
    const data = await post(`/api/users/login?role=${role}`, { uid, password });
    setCurrentUser(data.user);
    router.push('/');
  } catch (err) {
    alert('username atau password salah');
  }
};

const signup = () => {};

export { login, signup };
