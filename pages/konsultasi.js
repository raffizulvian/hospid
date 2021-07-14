import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCookie } from 'next-cookie';

import { AppointmentCard } from '../components/appointment';

import { get, post } from '../lib/client/fetcher';
import { onRegister, onEdit, onDelete } from '../lib/client/helper/register';
import { getUser } from '../lib/client/helper/auth';
import { useAuthDispatch } from '../lib/client/context/hooks';
import { ACTIONS } from '../lib/client/context/AuthContext';
import AppointmentModal from '../components/appointment/AppointmentModal';
import { setAccessOptions, setRefreshOptions } from '../lib/server/utils/token';

function Konsultasi({ initialData, user, loginStatus }) {
  const { data } = useSWR('/api/appointments', get, { initialData });
  const { appointments } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const router = useRouter();

  const dispatch = useAuthDispatch();

  useEffect(() => {
    dispatch({ type: ACTIONS.UPDATE, payload: { user, loginStatus } });
  }, [dispatch, loginStatus, user]);

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedAppointment(null);
    }
  }, [isModalOpen]);

  return (
    <>
      <main className='main w-full overflow-x-hidden'>
        <section className='max-w-screen-md mx-auto space-y-4 py-3 overflow-y-auto'>
          {appointments.map((appointment) => {
            const slot = appointment.capacity - appointment.totalRegistered;
            return (
              <AppointmentCard
                key={appointment.aid}
                slot={slot}
                doctorName={appointment.doctorName}
                description={appointment.description}
                capacity={appointment.capacity}
                totalRegistered={appointment.totalRegistered}
                onSelectMore={() => {
                  setSelectedAppointment({ ...appointment, slot });
                  setIsModalOpen(true);
                }}
              />
            );
          })}
        </section>
      </main>

      <AppointmentModal
        isOpen={isModalOpen}
        openHandler={() => setIsModalOpen((prev) => !prev)}
        doctorName={selectedAppointment?.doctorName ?? ''}
        aid={selectedAppointment?.aid ?? ''}
        description={selectedAppointment?.description ?? ''}
        capacity={selectedAppointment?.capacity ?? ''}
        totalRegistered={selectedAppointment?.totalRegistered ?? '-1'}
        slot={selectedAppointment?.slot ?? '-1'}
        onRegister={() => onRegister(selectedAppointment?.aid, user.uid, loginStatus, router)}
        onEdit={() => onEdit(user.uid, selectedAppointment, loginStatus, router)}
        onDelete={() => onDelete(user.uid, selectedAppointment?.aid, loginStatus, router)}
      />
    </>
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

    const res = await post(
      'http://localhost:3000/api/refresh',
      { uid: user.uid },
      {
        headers: {
          withCredentials: true,
          Cookie: `RFSTKN=${refreshToken}`,
        },
      }
    );

    if (res.status === 'ok') {
      cookie.set('token', res.token.accessToken, setAccessOptions);
      cookie.set('RFSTKN', res.token.refreshToken, setRefreshOptions);

      return { props: { initialData, user, loginStatus: 'partial' } };
    }
  }
  return { props: { initialData, user: null, loginStatus: 'no' } };
}
