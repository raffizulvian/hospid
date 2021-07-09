import { NavbarLayout } from '../components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  switch (Component.layout) {
    case 'navbar':
      return (
        <NavbarLayout>
          <Component {...pageProps} />
        </NavbarLayout>
      );

    default:
      return <Component {...pageProps} />;
  }
}

export default MyApp;
