import { useState } from 'react';
import { AuthLayout, NavbarLayout } from '../components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState(null);

  switch (Component.layout) {
    case 'navbar':
      return (
        <NavbarLayout isLogin={!!currentUser}>
          <Component currentUser={currentUser} setCurrentUser={setCurrentUser} {...pageProps} />
        </NavbarLayout>
      );

    case 'auth':
      return (
        <AuthLayout role={Component.authRole} title={Component.authTitle}>
          <Component setCurrentUser={setCurrentUser} {...pageProps} />
        </AuthLayout>
      );

    default:
      return <Component {...pageProps} />;
  }
}

export default MyApp;
