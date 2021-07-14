import Image from 'next/image';
import { useEffect } from 'react';
import { useCookie } from 'next-cookie';

import ButtonLink from '../components/button/ButtonLink';

import { getUser } from '../lib/client/helper/auth';
import { ACTIONS } from '../lib/client/context/AuthContext';
import { useAuthDispatch } from '../lib/client/context/hooks';

function Home({ user, loginStatus }) {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    dispatch({ type: ACTIONS.UPDATE, payload: { user, loginStatus } });
  }, [dispatch, loginStatus, user]);

  return (
    <main className='main w-full overflow-x-hidden overflow-y-auto'>
      <section className='flex flex-col-reverse justify-end items-center h-full max-w-screen-lg mx-auto px-[4%] py-8 lg:px-0 md:flex-row md:justify-between'>
        <div className='space-y-5 md:space-y-8 md:w-2/5'>
          <div className='space-y-3 md:space-y-8'>
            <h1 className='text-5xl font-semibold text-gray-900 md:text-7xl'>
              Daftar Konsultasi di Hospid
            </h1>
            <p className='text-lg text-gray-900 max-w-prose'>
              Hospid adalah sistem informasi kesehatan yang memberikan akses pendaftaran konsultasi
              dokter antara pasien dan rumah sakit secara langsung.
            </p>
          </div>
          <ButtonLink href='/signup' big>
            Gabung sekarang
          </ButtonLink>
        </div>
        <div className='w-72 h-72 md:w-[26rem] md:h-[26rem]'>
          <Image src='/doctor.svg' alt='' width={300} height={300} />
        </div>
      </section>
    </main>
  );
}

Home.id = 'home';
Home.layout = 'navbar';

export default Home;

export async function getServerSideProps(ctx) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cookie = useCookie(ctx);

  const token = cookie.get('token');
  const refreshToken = cookie.get('RFSTKN');

  if (token) {
    const user = getUser(token);

    return { props: { user, loginStatus: 'full' } };
  }

  if (refreshToken) {
    const user = getUser(refreshToken);

    return { props: { user, loginStatus: 'partial' } };
  }

  return { props: { user: null, loginStatus: 'no' } };
}
