import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookie } from 'next-cookie';

import Form from '../../components/form';
import CreateInput from '../../components/form/appointment/CreateInput';

import { post } from '../../lib/client/fetcher';
import { getUser } from '../../lib/client/helper/auth';
import { onCreate } from '../../lib/client/helper/register';
import { ACTIONS } from '../../lib/client/context/AuthContext';
import { useAuthDispatch } from '../../lib/client/context/hooks';

import { setAccessOptions, setRefreshOptions } from '../../lib/server/utils/token';

function Baru({ user, loginStatus }) {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    dispatch({ type: ACTIONS.UPDATE, payload: { user, loginStatus } });
  }, [dispatch, loginStatus, user]);

  const router = useRouter();

  return (
    <main className='main w-full overflow-y-auto'>
      <div className='w-full max-w-screen-md p-6 mx-auto'>
        <h1 className='text-3xl font-semibold text-gray-900 mb-6'>Konsultasi Baru</h1>
        <Form>
          <CreateInput
            onSubmit={(e, payload) => onCreate(e, payload, user.uid, loginStatus, router)}
          />
        </Form>
      </div>
    </main>
  );
}

Baru.layout = 'navbar';

export default Baru;

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

      return { props: { user, loginStatus: 'full' } };
    }
  }

  return { redirect: { destination: '/login/admin', permanent: false } };
}
