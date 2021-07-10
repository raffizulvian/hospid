import { post } from '../../fetcher';

const onRegister = async (e, uid, isLogin, router) => {
  if (isLogin === 'no') {
    router.push('/');
    return;
  }

  if (isLogin === 'partial') {
    const config = { headers: { withCredentials: true } };
    await post('/api/refresh', { uid }, config).catch(() => router.push('/login'));
  }

  const aid = e.target.id;
  await post(`/api/appointment/${aid}`, { uid });
  router.push('/dashboard');
};

// eslint-disable-next-line import/prefer-default-export
export { onRegister };
