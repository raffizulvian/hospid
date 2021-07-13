import PropTypes from 'prop-types';
import { useState } from 'react';
import ButtonAction from '../../button/ButtonAction';

function InputReview({ defaultValue, onSubmit, onBack }) {
  const [confirmation, setConfirmation] = useState(defaultValue.confirmation);

  return (
    <>
      <div className='flex items-center space-x-2 my-1'>
        <h4 className='text-lg font-medium text-gray-900'>Nama depan: </h4>
        <p className='italic text-gray-700'>{defaultValue.firstName}</p>
      </div>

      <div className='flex items-center space-x-2 my-1'>
        <h4 className='text-lg font-medium text-gray-900'>Nama belakang: </h4>
        <p className='italic text-gray-700'>{defaultValue.lastName}</p>
      </div>

      <div className='flex items-center space-x-2 my-1'>
        <h4 className='text-lg font-medium text-gray-900'>Umur: </h4>
        <p className='italic text-gray-700'>
          {defaultValue.age} <span>tahun</span>
        </p>
      </div>

      <div className='flex items-center space-x-2 my-1'>
        <h4 className='text-lg font-medium text-gray-900'>Username: </h4>
        <p className='italic text-gray-700'>{defaultValue.uid}</p>
      </div>

      <div className='flex items-center space-x-2 my-1'>
        <h4 className='text-lg font-medium text-gray-900'>Email: </h4>
        <p className='italic text-gray-700'>{defaultValue.email}</p>
      </div>

      <div className='flex items-center space-x-2 mt-5'>
        <input
          type='checkbox'
          name='confirmation'
          id='confirmation'
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.checked)}
        />
        <label className='text-sm text-gray-900' htmlFor='confirmation'>
          Data diri yang saya masukkan sudah benar
        </label>
      </div>

      <div className='flex space-x-4 mt-5'>
        <ButtonAction big className='w-full' onClick={onBack}>
          Kembali
        </ButtonAction>
        <ButtonAction
          big
          disabled={!confirmation}
          className='w-full'
          onClick={() => onSubmit({ confirmation })}>
          Daftar
        </ButtonAction>
      </div>
    </>
  );
}

InputReview.propTypes = {
  defaultValue: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default InputReview;
