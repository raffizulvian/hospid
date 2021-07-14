import { createMachine, assign } from 'xstate';
import { signup } from './auth';

const signupStateMachine = createMachine(
  {
    id: 'signup',
    initial: 'personalData',
    context: {
      firstName: '',
      lastName: '',
      age: '',
      uid: '',
      email: '',
      password: '',
      confirmation: false,
      fecthResponse: undefined,
      error: undefined,
    },
    states: {
      personalData: {
        on: {
          NEXT: {
            target: 'authData',
            actions: ['updatePersonalData'],
          },
        },
      },
      authData: {
        on: {
          PREV: { target: 'personalData', actions: ['updateAuthData'] },
          NEXT: { target: 'review', actions: ['updateAuthData'] },
        },
      },
      review: {
        on: {
          BACK: { target: 'authData', actions: ['updateConfirmationData'] },
          CONFIRM: { target: 'submit', actions: ['updateConfirmationData'] },
        },
      },
      submit: {
        invoke: {
          id: 'signup',
          src: (ctx, e) => signup(ctx).then((res) => ({ user: res.user, router: e.router })),
          onDone: { target: 'success', actions: ['success'] },
          onError: { target: 'review', actions: ['failure'] },
        },
      },
      success: {
        type: 'final',
        invoke: {
          id: 'success',
          src: (_, e) => e.data.router.push('/login'),
        },
      },
    },
  },
  {
    actions: {
      updatePersonalData: assign({
        firstName: (_, e) => e.firstName,
        lastName: (_, e) => e.lastName,
        age: (_, e) => e.age,
      }),
      updateAuthData: assign({
        uid: (_, e) => e.uid,
        email: (_, e) => e.email,
        password: (_, e) => e.password,
      }),
      updateConfirmationData: assign({ confirmation: (_, e) => e.confirmation }),
      success: () => {
        alert('Berhasil sign up, silakan login');
        return assign({ fecthResponse: (_, e) => e.data.user });
      },
      failure: () => {
        alert('Gagal sign up, silakan pastikan data sudah sesuai dan ulangi');
        return assign({ error: (_, e) => e.data });
      },
    },
  }
);

export default signupStateMachine;
