import PropTypes from 'prop-types';
import { useState } from 'react';
import { ButtonAction } from '../../button';

function EditInput({ aid, defaultData, onEdit }) {
  const [doctorName, setDoctorName] = useState(defaultData.doctorName);
  const [description, setDescription] = useState(defaultData.description);
  const [capacity, setCapacity] = useState(defaultData.capacity);

  return (
    <>
      <label htmlFor='doctorName-input' className='text-gray-700'>
        Nama Dokter <span className='text-purple-600'>*</span>
      </label>
      <input
        type='text'
        id='doctorname-input'
        placeholder='dr. Fira Kalsita'
        value={doctorName}
        onChange={(e) => setDoctorName(e.target.value)}
        className='mt-0 block w-full pt-1 pb-2 px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-purple-600'
      />

      <label htmlFor='description-input' className='text-gray-700 mt-4'>
        Deskripsi <span className='text-purple-600'>*</span>
      </label>
      <input
        type='text'
        id='description-input'
        placeholder='Kosultasi penyakit serta gangguan kesehatan pada saluran pencernaan.'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='mt-0 block w-full pt-1 pb-2 px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-purple-600'
      />

      <label htmlFor='capacity-input' className='text-gray-700 mt-4'>
        Kapasitas Pasien <span className='text-purple-600'>*</span>
      </label>
      <input
        type='number'
        id='capacity-input'
        placeholder='16'
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        className='mt-0 block w-full pt-1 pb-2 px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-purple-600'
      />

      <ButtonAction
        big
        className='w-full mt-10'
        disabled={
          doctorName === '' ||
          description === '' ||
          capacity === '' ||
          capacity === 0 ||
          capacity < defaultData.capacity
        }
        onClick={(e) => onEdit(e, { doctorName, description, capacity, aid })}>
        Sunting
      </ButtonAction>
    </>
  );
}

EditInput.propTypes = {
  aid: PropTypes.string.isRequired,
  defaultData: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditInput;
