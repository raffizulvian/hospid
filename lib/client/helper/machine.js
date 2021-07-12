import { createMachine, assign } from 'xstate';

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
      review: { on: { BACK: 'authData', CONFIRM: 'submit' } },
      submit: { type: 'final' },
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
    },
  }
);

export default signupStateMachine;
