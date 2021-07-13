import PropTypes from 'prop-types';
import { useState } from 'react';

import ButtonAction from '../../button/ButtonAction';

function PersonalDataInput({ defaultValue, onNext }) {
  const [firstName, setFirstName] = useState(defaultValue.firstName);
  const [lastName, setLastName] = useState(defaultValue.lastName);
  const [age, setAge] = useState(defaultValue.age);

  return (
    <>
      <div className='flex space-x-4'>
        <div className='w-full'>
          <label htmlFor='firstName-input' className='text-gray-700'>
            Nama Depan <span className='text-purple-600'>*</span>
          </label>
          <input
            type='text'
            id='firstName-input'
            placeholder='Bambang'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='mt-0 block w-full pt-1 pb-2 px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-purple-600'
          />
        </div>

        <div className='w-full'>
          <label htmlFor='lastName-input' className='text-gray-700'>
            Nama Belakang <span className='text-purple-600'>*</span>
          </label>
          <input
            type='text'
            id='lastName-input'
            placeholder='Zulkifar'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='mt-0 block w-full pt-1 pb-2 px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-purple-600'
          />
        </div>
      </div>

      <label htmlFor='age-input' className='text-gray-700 mt-4'>
        Umur <span className='text-purple-600'>*</span>
      </label>
      <input
        type='number'
        id='age-input'
        placeholder='16'
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className='mt-0 block w-full pt-1 pb-2 px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-purple-600'
      />

      <ButtonAction
        big
        className='w-full mt-10'
        disabled={firstName === '' || lastName === '' || age === '' || age === 0}
        onClick={() => onNext({ firstName, lastName, age })}>
        Selanjutnya
      </ButtonAction>
    </>
  );
}

PersonalDataInput.propTypes = {
  defaultValue: PropTypes.object.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default PersonalDataInput;
