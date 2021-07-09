import { NavbarLayout } from '../components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  if (Component.withNavbar) {
    return (
      <NavbarLayout>
        <Component {...pageProps} />
      </NavbarLayout>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;
