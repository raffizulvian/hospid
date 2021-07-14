import { useCookie } from 'next-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Form from '../../../components/form';
import EditInput from '../../../components/form/appointment/EditInput';
import { ACTIONS } from '../../../lib/client/context/AuthContext';
import { useAuthDispatch } from '../../../lib/client/context/hooks';
import { get, post } from '../../../lib/client/fetcher';
import { getUser } from '../../../lib/client/helper/auth';
import { onEdit } from '../../../lib/client/helper/register';
import { setAccessOptions, setRefreshOptions } from '../../../lib/server/utils/token';

function Edit({ user, loginStatus, defaultData }) {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    dispatch({ type: ACTIONS.UPDATE, payload: { user, loginStatus } });
  }, [dispatch, loginStatus, user]);

  const router = useRouter();
  const { aid } = router.query;

  return (
    <main className='main w-full overflow-y-auto'>
      <div className='w-full max-w-screen-md p-6 mx-auto'>
        <h1 className='text-3xl font-semibold text-gray-900 mb-6'>Sunting Konsultasi</h1>
        <Form>
          <EditInput
            aid={aid}
            defaultData={defaultData}
            onEdit={(e, payload) => onEdit(e, user.uid, payload, loginStatus, router)}
          />
        </Form>
      </div>
    </main>
  );
}

Edit.layout = 'navbar';

export default Edit;

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

    const config = { withCredentials: true };
    const { appointments } = await get('http://localhost:3000/api/appointments', config);
    const defaultData = appointments.filter(
      (appointment) => appointment.aid === ctx.req.url.slice(12)
    )[0];

    return { props: { user, loginStatus: 'full', defaultData } };
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

      const config = { withCredentials: true };
      const { appointments } = await get('http://localhost:3000/api/appointments', config);
      const defaultData = appointments.filter(
        (appointment) => appointment.aid === ctx.req.query.aid
      );

      return { props: { user, loginStatus: 'full', defaultData } };
    }
  }

  return { redirect: { destination: '/login/admin', permanent: false } };
}
