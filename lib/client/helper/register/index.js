import { mutate } from 'swr';
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
  mutate('/api/appointments');
};

const onCancel = async (e, uid, appointments) => {
  const aid = e.target.id;
  const updatedAppointments = appointments.filter((appointment) => appointment.aid !== aid);

  mutate('/api/appointments', updatedAppointments, false);
  await post(`/api/appointments/${aid}/registrants/${uid}`);
  mutate('/api/appointments');
};

export { onRegister, onCancel };
