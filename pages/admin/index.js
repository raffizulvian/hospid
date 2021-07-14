import { useEffect } from 'react';
import { useCookie } from 'next-cookie';

import UserData from '../../components/user/UserData';
import AdminPanel from '../../components/user/AdminPanel';

import { post } from '../../lib/client/fetcher';
import { getUser } from '../../lib/client/helper/auth';
import { useAuthDispatch } from '../../lib/client/context/hooks';
import { ACTIONS } from '../../lib/client/context/AuthContext';

import { setAccessOptions, setRefreshOptions } from '../../lib/server/utils/token';

function Admin({ user, loginStatus }) {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    dispatch({ type: ACTIONS.UPDATE, payload: { user, loginStatus } });
  }, [dispatch, loginStatus, user]);

  return (
    <main className='main overflow-y-auto'>
      <UserData name={user.name} email={user.email} age={user.age} />

      <AdminPanel />
    </main>
  );
}

Admin.layout = 'navbar';

export default Admin;

export async function getServerSideProps(ctx) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cookie = useCookie(ctx);

  const token = cookie.get('token');
  const refreshToken = cookie.get('RFSTKN');

  if (token) {
    const user = getUser(token);
    if (user.uid === 'patient') {
      return { redirect: { destination: '/dashboard', permanent: false } };
    }

    return { props: { user, loginStatus: 'full' } };
  }

  if (refreshToken) {
    const user = getUser(refreshToken);
    if (user.uid === 'patient') {
      return { redirect: { destination: '/dashboard', permanent: false } };
    }

    const res = await post(
      'https://hospid.netlify.app/api/refresh',
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

      return { props: { user, loginStatus: 'full' } };
    }
  }

  return { redirect: { destination: '/login/admin', permanent: false } };
}
