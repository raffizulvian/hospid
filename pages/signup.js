import { useMachine } from '@xstate/react';

import Form, { PersonalDataInput, AuthDataInput, InputReview } from '../components/form';
import NavLink from '../components/navigation/NavLink';

import signupStateMachine from '../lib/client/helper/machine';

function Signup() {
  const [current, send] = useMachine(signupStateMachine);

  return (
    <>
      <Form>
        {current.matches('personalData') && (
          <PersonalDataInput
            defaultValue={current.context}
            onNext={(value) => send({ type: 'NEXT', ...value })}
          />
        )}

        {current.matches('authData') && (
          <AuthDataInput
            defaultValue={current.context}
            onPrev={(value) => send({ type: 'PREV', ...value })}
            onNext={(value) => send({ type: 'NEXT', ...value })}
          />
        )}

        {current.matches('review') && (
          <InputReview
            defaultValue={current.context}
            onBack={() => send({ type: 'BACK', confirmation: false })}
            onSubmit={(value) => send({ type: 'SUBMIT', ...value })}
          />
        )}
      </Form>

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
