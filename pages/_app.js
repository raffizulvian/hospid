import AuthProvider from '../components/context';
import { AuthLayout, NavbarLayout } from '../components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  switch (Component.layout) {
    case 'navbar':
      return (
        <AuthProvider>
          <NavbarLayout>
            <Component {...pageProps} />
          </NavbarLayout>
        </AuthProvider>
      );

    case 'auth':
      return (
        <AuthProvider>
          <AuthLayout role={Component.authRole} title={Component.authTitle}>
            <Component {...pageProps} />
          </AuthLayout>
        </AuthProvider>
      );

    default:
      return <Component {...pageProps} />;
  }
}

export default MyApp;
