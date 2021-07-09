import { useState } from 'react';
import ButtonLink from '../../components/button/ButtonAction';
import NavLink from '../../components/navigation/NavLink';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <form className='flex flex-col'>
        <label htmlFor='username' className='text-gray-700'>
          Username
        </label>
        <input
          type='text'
          placeholder='bambang1624'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            console.log(username);
          }}
          className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-purple-600'
        />
        <label htmlFor='password' className='text-gray-700 mt-4'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password-input'
          placeholder='********'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(password);
          }}
          className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-purple-600'
        />
        <ButtonLink big className='mt-10'>
          Login
        </ButtonLink>
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
