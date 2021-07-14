import useSWR from 'swr';
import { useEffect } from 'react';
import { useCookie } from 'next-cookie';

import UserData from '../components/user/UserData';
import UserAppointment from '../components/user/UserAppointment';

import { get, post } from '../lib/client/fetcher';
import { getUser } from '../lib/client/helper/auth';
import { onCancel } from '../lib/client/helper/register';
import { useAuthDispatch } from '../lib/client/context/hooks';
import { ACTIONS } from '../lib/client/context/AuthContext';

import { setAccessOptions, setRefreshOptions } from '../lib/server/utils/token';

function Dashboard({ user, initialData, loginStatus }) {
  const { data } = useSWR(`/api/users/${user.uid}/appointments`, get, { initialData });
  const { appointments } = data;

  const dispatch = useAuthDispatch();

  useEffect(() => {
    dispatch({ type: ACTIONS.UPDATE, payload: { user, loginStatus } });
  }, [dispatch, loginStatus, user]);

  return (
    <main className='main overflow-y-auto'>
      <UserData name={user.name} email={user.email} age={user.age} />

      <UserAppointment appointments={appointments} uid={user.uid} onCancel={onCancel} />
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
    if (user.uid === 'admin') {
      return { redirect: { destination: '/admin', permanent: false } };
    }

    const initialData = await get(`http://localhost:3000/api/users/${user.uid}/appointments`, {
      headers: {
        withCredentials: true,
        Cookie: `token=${token}; RFSTKN=${refreshToken};`,
      },
    });

    return { props: { user, initialData, loginStatus: 'full' } };
  }

  if (refreshToken) {
    const user = getUser(refreshToken);
    if (user.uid === 'admin') {
      return { redirect: { destination: '/admin', permanent: false } };
    }

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
          Cookie: `token=${res.token.accessToken}; RFSTKN=${res.token.refreshToken};`,
        },
      });

      return { props: { user, initialData, loginStatus: 'partial' } };
    }
  }

  return { redirect: { destination: '/login', permanent: false } };
}
