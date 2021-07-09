import { useState } from 'react';
import ButtonLink from '../components/button/ButtonAction';
import NavLink from '../components/navigation/NavLink';

function Signup() {
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
          Selanjutnya
        </ButtonLink>
      </form>
      <p className='flex justify-center text-sm text-gray-600 mt-3'>
        Sudah punya akun?&nbsp;
        <NavLink href='/login'>Login</NavLink>
      </p>
    </>
  );
}

Signup.id = 'signup';
Signup.layout = 'auth';
Signup.authRole = '';
Signup.authTitle = 'Sign up';

export default Signup;
