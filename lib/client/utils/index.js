const togglePassword = (e, passwordType, setPasswordType) => {
  e.preventDefault();
  if (passwordType === 'password') {
    setPasswordType('text');
  } else {
    setPasswordType('password');
  }
};

// eslint-disable-next-line import/prefer-default-export
export { togglePassword };
