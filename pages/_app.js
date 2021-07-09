import { AuthLayout, NavbarLayout } from '../components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  switch (Component.layout) {
    case 'navbar':
      return (
        <NavbarLayout>
          <Component {...pageProps} />
        </NavbarLayout>
      );

    case 'auth':
      return (
        <AuthLayout role={Component.authRole} title={Component.authTitle}>
          <Component {...pageProps} />
        </AuthLayout>
      );

    default:
      return <Component {...pageProps} />;
  }
}

export default MyApp;
