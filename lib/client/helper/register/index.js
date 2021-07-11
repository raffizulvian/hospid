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
  await post(`/api/appointments/${aid}`, { uid });
  router.push('/dashboard');
};

const onCancel = async (e, uid) => {
  const aid = e.target.id;
  await post(`/api/appointments/${aid}/registrants/${uid}`);
  document.getElementById(aid).remove();
};

export { onRegister, onCancel };
