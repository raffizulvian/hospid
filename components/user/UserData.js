import Image from 'next/image';
import PropTypes from 'prop-types';

function UserData({ name, email, age }) {
  return (
    <section className='sticky top-0 flex items-center w-full px-4 py-2 space-x-5 bg-white shadow'>
      <Image src='/user.svg' alt='' height={96} width={96} />
      <div className='flex-1'>
        <h3 className='text-3xl font-medium text-gray-900 mb-1'>{name}</h3>
        <p className='flex space-x-2 text-sm text-gray-700 italic'>
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-purple-500'
              viewBox='0 0 20 20'
              fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z'
                clipRule='evenodd'
              />
            </svg>
          </span>
          <span>{email}</span>
        </p>
        <p className='flex space-x-2 text-sm text-gray-700 italic'>
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-purple-500'
              viewBox='0 0 20 20'
              fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                clipRule='evenodd'
              />
            </svg>
          </span>
          <span>{age} tahun</span>
        </p>
      </div>
    </section>
  );
}

UserData.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default UserData;
