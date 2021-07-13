import { mutate } from 'swr';
import { del, post, put } from '../fetcher';

const onRegister = async (aid, uid, loginStatus, router) => {
  if (loginStatus === 'no') {
    router.push('/login');
    return;
  }

  if (loginStatus === 'partial') {
    const config = { withCredentials: true };
    await post('/api/refresh', { uid }, config).catch(() => router.push('/login'));
  }

  await post(`/api/appointments/${aid}`, { uid }, { withCredentials: true });
  mutate('/api/appointments');
};

const onCancel = async (e, uid, appointments) => {
  const aid = e.target.id;
  const updatedAppointments = appointments.filter((appointment) => appointment.aid !== aid);

  mutate('/api/appointments', updatedAppointments, false);
  await post(`/api/appointments/${aid}/registrants/${uid}`, {}, { withCredentials: true });
  mutate('/api/appointments');
};

const onEdit = async (uid, { aid, doctorName, description, capacity }, loginStatus, router) => {
  if (loginStatus === 'no') {
    router.push('/login');
    return;
  }

  if (loginStatus === 'partial') {
    const config = { withCredentials: true };
    await post('/api/refresh', { uid }, config).catch(() => router.push('/login'));
  }

  const payload = { doctorName, description, capacity };
  await put(`/api/appointments/${aid}`, payload, { withCredentials: true });
  mutate('/api/appointments');
};

const onDelete = async (uid, aid, loginStatus, router) => {
  if (loginStatus === 'no') {
    router.push('/login');
    return;
  }

  if (loginStatus === 'partial') {
    const config = { withCredentials: true };
    await post('/api/refresh', { uid }, config).catch(() => router.push('/login'));
  }

  await del(`/api/appointments/${aid}`, { withCredentials: true });
  mutate('/api/appointments');
};

export { onRegister, onCancel, onEdit, onDelete };
