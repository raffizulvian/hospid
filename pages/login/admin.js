import { useRouter } from 'next/router';
import { useState } from 'react';

import ButtonAction from '../../components/button/ButtonAction';
import NavLink from '../../components/navigation/NavLink';

import { login } from '../../lib/client/helper/auth';
import { togglePassword } from '../../lib/client/utils';
import { useAuthDispatch } from '../../lib/client/context/hooks';

function Login() {
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');

  const router = useRouter();

  const dispatch = useAuthDispatch();

  return (
    <>
      <form className='flex flex-col'>
        <label htmlFor='username' className='text-gray-700'>
          Username
        </label>
        <input
          type='text'
          id='username-input'
          placeholder='bambang1624'
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-purple-600'
        />

        <label htmlFor='password' className='text-gray-700 mt-4'>
          Password
        </label>
        <div className='relative flex'>
          <input
            type={passwordType}
            name='password'
            id='password-input'
            placeholder='********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-purple-600'
          />

          <button
            onClick={(e) => togglePassword(e, passwordType, setPasswordType)}
            className='absolute right-2 bottom-2 p-1'>
            {passwordType === 'password' && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'>
                <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                <path
                  fillRule='evenodd'
                  d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                  clipRule='evenodd'
                />
              </svg>
            )}
            {passwordType === 'text' && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z'
                  clipRule='evenodd'
                />
                <path d='M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z' />
              </svg>
            )}
          </button>
        </div>

        <ButtonAction
          big
          className='mt-10'
          onClick={(e) => login(e, uid, password, 'admin', router, dispatch)}>
          Login
        </ButtonAction>
      </form>

      <p className='flex justify-center text-sm text-gray-600 mt-3'>
        Belum punya akun?&nbsp;
        <NavLink href='/signup'>Sign up</NavLink>
      </p>

      <p className='flex justify-center text-sm text-gray-600 mt-1'>
        Bukan admin? Login sebagai&nbsp;
        <NavLink href='/login'>pasien</NavLink>
      </p>
    </>
  );
}

Login.id = 'login-admin';
Login.layout = 'auth';
Login.authRole = 'Admin';
Login.authTitle = 'Login';

export default Login;
