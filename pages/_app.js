import { Layout } from '../components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  if (Component.withNavbar) {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;
