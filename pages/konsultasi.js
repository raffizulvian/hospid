import useSWR from 'swr';
import { useCookie } from 'next-cookie';
import { useRouter } from 'next/router';
import { AppointmentCard } from '../components/appointment';
import { get } from '../lib/client/fetcher';
import { onRegister } from '../lib/client/helper/register';
import { getuid } from '../lib/client/helper/auth/getUser';

function Konsultasi({ initialData, uid, isLogin }) {
  const { data } = useSWR('/api/appointments', get, { initialData });
  const { appointments } = data;

  const router = useRouter();

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
              onRegister={(e) => onRegister(e, uid, isLogin, router)}
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
    const uid = getuid(token);
    return { props: { initialData, uid, isLogin: 'full' } };
  }

  if (refreshToken) {
    const uid = getuid(refreshToken);
    return { props: { initialData, uid, isLogin: 'partial' } };
  }

  return { props: { initialData, uid: null, isLogin: 'no' } };
}
