import Form, { LoginInput } from '../../components/form';
import NavLink from '../../components/navigation/NavLink';

function Login() {
  return (
    <>
      <Form>
        <LoginInput role='admin' />
      </Form>

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
