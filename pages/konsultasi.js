import useSWR from 'swr';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookie } from 'next-cookie';

import { AppointmentCard } from '../components/appointment';

import { get } from '../lib/client/fetcher';
import { onRegister } from '../lib/client/helper/register';
import { getUser } from '../lib/client/helper/auth';
import { useAuthDispatch } from '../lib/client/context/hooks';
import { ACTIONS } from '../lib/client/context/AuthContext';

function Konsultasi({ initialData, user, loginStatus }) {
  const { data } = useSWR('/api/appointments', get, { initialData });
  const { appointments } = data;

  const router = useRouter();

  const dispatch = useAuthDispatch();

  useEffect(() => {
    dispatch({ type: ACTIONS.UPDATE, payload: { user, loginStatus } });
  }, [dispatch, loginStatus, user]);

  return (
    <main className='main w-full overflow-x-hidden'>
      <section className='max-w-screen-md mx-auto space-y-4 py-3 overflow-y-auto'>
        {appointments.map((appointment) => {
          const slot = appointment.capacity - appointment.totalRegistered;
          return (
            <AppointmentCard
              key={appointment.aid}
              aid={appointment.aid}
              slot={slot}
              doctorName={appointment.doctorName}
              description={appointment.description}
              capacity={appointment.capacity}
              totalRegistered={appointment.totalRegistered}
              onRegister={(e) => onRegister(e, user.uid, loginStatus, router)}
            />
          );
        })}
      </section>
    </main>
  );
}

Konsultasi.layout = 'navbar';

export default Konsultasi;

export async function getServerSideProps(ctx) {
  const initialData = await get('http://localhost:3000/api/appointments');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cookie = useCookie(ctx);

  const token = cookie.get('token');
  const refreshToken = cookie.get('RFSTKN');

  if (token) {
    const user = getUser(token);

    return { props: { initialData, user, loginStatus: 'full' } };
  }

  if (refreshToken) {
    const user = getUser(refreshToken);

    return { props: { initialData, user, loginStatus: 'partial' } };
  }

  return { props: { initialData, user: null, loginStatus: 'no' } };
}
