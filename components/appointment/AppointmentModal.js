import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { ButtonAction, ButtonLink } from '../button';

import { useAuthState } from '../../lib/client/context/hooks';

function AppointmentModal({
  isOpen,
  openHandler,
  aid,
  doctorName,
  description,
  capacity,
  totalRegistered,
  slot,
  onRegister,
  onDelete,
}) {
  const { user, loginStatus } = useAuthState();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 p-6 sm:px-[8%] md:px-[12%] lg:px-[16%] xl:px-[24%] overflow-y-auto'
        onClose={() => openHandler(false)}>
        <div className='fixed inset-0 min-h-full px-4 text-center'>
          {' '}
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='h-full w-full fixed inset-0 bg-gray-500 bg-opacity-60' />
          </Transition.Child>
        </div>

        <span className='inline-block h-full align-middle' aria-hidden='true'>
          &#8203;
        </span>

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'>
          <div className='inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
            <Dialog.Title as='h1' className='text-3xl font-medium leading-6 text-gray-900 '>
              Informasi Konsultasi
            </Dialog.Title>

            <div className='mt-5'>
              <Dialog.Description as='div' className='mt-2'>
                <h2 className='text-xl font-semibold text-gray-900'>{doctorName}</h2>
                <p className='text-gray-900 mt-0.5'>{description}</p>

                <div className='text-sm text-gray-800 space-y-0.5 mt-3'>
                  <p>
                    Kapasitas maximum:{' '}
                    <span className='font-medium text-purple-600'>{capacity}</span>
                  </p>

                  <p>
                    Jumlah pasien terdaftar:{' '}
                    <span className='font-medium text-purple-600'>{totalRegistered}</span>
                  </p>

                  <p>
                    Sisa slot yang tersedia:{' '}
                    <span className='font-medium text-purple-600'>{slot}</span>
                  </p>
                </div>
              </Dialog.Description>
            </div>

            <div className='mt-4'>
              {loginStatus === 'no' && <ButtonLink href='/login'>Login untuk daftar</ButtonLink>}

              {user?.role === 'patient' && (
                <ButtonAction onClick={onRegister} disabled={loginStatus === 'no'}>
                  Daftar
                </ButtonAction>
              )}

              {user?.role === 'admin' && (
                <>
                  <ButtonAction secondary onClick={onDelete}>
                    Hapus
                  </ButtonAction>
                  <ButtonLink href={`/admin/edit/${aid}`} className='ml-2'>
                    Sunting
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

AppointmentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  openHandler: PropTypes.func.isRequired,
  aid: PropTypes.string.isRequired,
  doctorName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  capacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  totalRegistered: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  slot: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onRegister: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AppointmentModal;
