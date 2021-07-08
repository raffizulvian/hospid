import Link from 'next/link';
import PropTypes from 'prop-types';
import { BurgerMenu, Navbar, NavLink } from '../navigation';

function Layout({ children }) {
  return (
    <>
      <Navbar>
        <NavLink href='/' color='text-gray-900'>
          Home
        </NavLink>
        <NavLink href='/konsultasi' color='text-gray-900'>
          Konsultasi
        </NavLink>
        <NavLink href='/tentang' color='text-gray-900'>
          Tentang
        </NavLink>
        <NavLink href='/faq' color='text-gray-900'>
          FAQ
        </NavLink>
      </Navbar>
      <BurgerMenu>
        <Link href='/'>
          <a>Hospid</a>
        </Link>
        <Link href='/konsultasi'>
          <a>Konsultasi</a>
        </Link>
        <Link href='/Tentang'>
          <a>Tentang</a>
        </Link>
        <Link href='/faq'>
          <a>FAQ</a>
        </Link>
        <Link href='/login'>
          <a>Login</a>
        </Link>
        <Link href='/signup'>
          <a>Sign up</a>
        </Link>
      </BurgerMenu>
      {children}
    </>
  );
}

Layout.propTypes = { children: PropTypes.object };

export default Layout;
