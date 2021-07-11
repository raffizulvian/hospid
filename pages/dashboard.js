import Image from 'next/image';
import useSWR from 'swr';
import { useCookie } from 'next-cookie';

import { AppointmentRegisteredCard } from '../components/appointment';
import { ButtonLink } from '../components/button';
import { getUser } from '../lib/client/helper/auth';
import { get, post } from '../lib/client/fetcher';
import { onCancel } from '../lib/client/helper/register';
import { setAccessOptions, setRefreshOptions } from '../lib/server/utils/token';

function Dashboard({ user, initialData, setCurrentUser }) {
  const { data } = useSWR(`/api/users/${user.uid}/appointments`, get, { initialData });
  const { appointments } = data;

  setCurrentUser(user);

  return (
    <main className='main overflow-y-auto'>
      <section className='sticky top-0 flex items-center w-full px-4 py-2 space-x-5 bg-white shadow'>
        <Image src='/user.svg' alt='' height={96} width={96} />
        <div className='flex-1'>
          <h3 className='text-3xl font-medium text-gray-900 mb-1'>{user.name}</h3>
          <p className='flex space-x-2 text-sm text-gray-700 italic'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-purple-500'
                viewBox='0 0 20 20'
                fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            <span>{user.email}</span>
          </p>
          <p className='flex space-x-2 text-sm text-gray-700 italic'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-purple-500'
                viewBox='0 0 20 20'
                fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            <span>{user.age} tahun</span>
          </p>
        </div>
      </section>
      <section className='py-4 space-y-4 overflow-y-auto'>
        {appointments.length > 0 &&
          appointments.map((appointment) => (
            <AppointmentRegisteredCard
              key={appointment.aid}
              aid={appointment.aid}
              doctorName={appointment.doctorName}
              description={appointment.description}
              onCancel={(e) => onCancel(e, user.uid, appointments)}
            />
          ))}

        {appointments.length === 0 && (
          <div className='flex flex-col justify-center items-center'>
            <h5 className='text-2xl mb-4'>Tidak ada konsultasi yang terdaftar</h5>
            <ButtonLink href='/konsultasi'>Daftar sekarang</ButtonLink>
          </div>
        )}
      </section>
    </main>
  );
}

Dashboard.layout = 'navbar';

export default Dashboard;

export async function getServerSideProps(ctx) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cookie = useCookie(ctx);

  const token = cookie.get('token');
  const refreshToken = cookie.get('RFSTKN');

  if (token) {
    const user = getUser(token);
    const initialData = await get(`http://localhost:3000/api/users/${user.uid}/appointments`, {
      headers: {
        withCredentials: true,
        Cookie: `token=${token}; RFSTKN=${refreshToken};`,
      },
    });

    return { props: { user, initialData } };
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
      const initialData = await get(`http://localhost:3000/api/users/${user.uid}/appointments`, {
        headers: {
          withCredentials: true,
          Cookie: `token=${token}; RFSTKN=${refreshToken};`,
        },
      });

      return { props: { user, initialData } };
    }
  }

  return { redirect: { destination: '/login', permanent: false } };
}
