import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

function AuthLayout({ children, role, title }) {
  return (
    <main className='h-full w-full'>
      <nav className='h-[4.5rem] w-full max-w-screen-lg mx-auto flex justify-between items-center'>
        <Link href='/'>
          <a className='flex ml-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            <span className='text-lg font-medium leading-[1.45rem]'>Kembali</span>
          </a>
        </Link>
        <p className='text-lg font-medium leading-[1.45rem] mr-6'>{role}</p>
      </nav>

      <section className='w-full max-w-screen-lg pb-6 px-6 mx-auto'>
        <Image src='/login.svg' alt='' height={190} width={190} />
        <p className='text-2xl font-light text-gray-900 max-w-prose'>Hallo selamat datang!</p>
        <h1 className='text-5xl font-semibold text-gray-900 md:text-7xl'>{title}</h1>
      </section>

      <section className='w-full max-w-screen-lg pb-6 px-6 mx-auto'>{children}</section>
    </main>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AuthLayout;
