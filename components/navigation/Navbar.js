import PropTypes from 'prop-types';
import ButtonLink from '../button/ButtonLink';

function Navbar({ children }) {
  return (
    <header className='sticky top-0 h-[4.5rem] w-full px-[4%] py-4 shadow-md z-30 bg-white lg:px-0'>
      <div className='flex items-center h-full w-full max-w-screen-lg mx-auto'>
        <div className='text-lg font-bold sm:mr-6'>
          {/* Logo */}
          Hospid
        </div>
        <nav className='flex justify-between items-center h-full w-full'>
          <div className='flex items-center sm:w-2/5 space-x-8'>
            <div className='hidden sm:flex justify-around items-center w-full'>{children}</div>
          </div>
          <div className='hidden sm:flex items-center space-x-4'>
            <ButtonLink href='/login' secondary>
              Login
            </ButtonLink>
            <ButtonLink href='/signup'>Sign up</ButtonLink>
          </div>
          <ButtonLink className='sm:hidden' href='/login' secondary>
            Login
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}

Navbar.propTypes = { children: PropTypes.arrayOf(PropTypes.element).isRequired };

export default Navbar;
