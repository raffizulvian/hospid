import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

function BurgerMenu({ children, id }) {
  return (
    <Popover as={Fragment}>
      {({ open }) => (
        <>
          <Popover.Button
            id={id}
            className={`fixed bottom-5 right-5 z-50 flex items-center justify-center h-16 w-16 bg-purple-600 border rounded-full transition backdrop-blur md:hidden ${
              open
                ? 'text-white border-white bg-opacity-60 border-opacity-50'
                : 'border-purple-600 bg-opacity-10 border-opacity-30'
            }`}>
            <Transition
              as={Fragment}
              show={!open}
              enter='ease-out duration-100'
              enterFrom='opacity-100'
              enterTo='opacity-0'
              leave='ease-in duration-10'
              leaveFrom='opacity-0'
              leaveTo='opacity-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </Transition>
            <Transition
              as={Fragment}
              show={open}
              enter='ease-out duration-100'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-10'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </Transition>
          </Popover.Button>

          <Popover.Overlay className='bg-purple-300 fixed inset-0 z-40 backdrop-filter backdrop-blur bg-opacity-30' />

          <Transition
            show={open}
            className='sidepanel fixed inset-0 z-50 overflow-hidden md:hidden'
            enter='ease-out duration-300'
            enterFrom='-left-full opacity-80'
            enterTo='left-0 opacity-100'
            leave='ease-in duration-150'
            leaveFrom='left-0 opacity-100'
            leaveTo='-left-full opacity-80'>
            <Popover.Panel static className='absolute inset-0 z-40 w-full flex pointer-events-none'>
              <div className='w-full max-w-sm min-w-0 bg-opacity-60 border-r border-white pointer-events-auto border-opacity-10 bg-purple-600 backdrop-filter backdrop-blur'>
                <nav className='flex flex-col space-y-4 h-full px-4 py-6 text-xl font-medium text-gray-50'>
                  {children}
                </nav>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

BurgerMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  id: PropTypes.string,
};

export default BurgerMenu;
