import Form, { LoginInput } from '../../components/form';
import NavLink from '../../components/navigation/NavLink';

function Login() {
  return (
    <>
      <Form>
        <LoginInput role='patient' />
      </Form>

      <p className='flex justify-center text-sm text-gray-600 mt-3'>
        Belum punya akun?&nbsp;
        <NavLink href='/signup'>Sign up</NavLink>
      </p>

      <p className='flex justify-center text-sm text-gray-600 mt-1'>
        Bukan pasien? Login sebagai&nbsp;
        <NavLink href='/login/admin'>admin</NavLink>
      </p>
    </>
  );
}

Login.id = 'login-patient';
Login.layout = 'auth';
Login.authRole = 'Pasien';
Login.authTitle = 'Login';

export default Login;
