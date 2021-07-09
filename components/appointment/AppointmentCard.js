import PropTypes from 'prop-types';
import ButtonAction from '../button/ButtonAction';

function AppointmentCard({
  id,
  slot,
  doctorName,
  description,
  capacity,
  totalRegistered,
  onSelectMore,
  onRegister,
}) {
  return (
    <div className='flex space-x-3 h-[8.75rem] px-3 mx-4 border shadow'>
      <div className='flex flex-col justify-center items-center w-1/5 max-w-[8rem]'>
        <p className='text-lg font-medium tracking-wide'>SLOT</p>
        <p className='text-3xl font-semibold'>{slot}</p>
      </div>
      <div className='flex-grow pl-3 py-2 border-l border-black'>
        <h3 className='text-xl font-semibold max-w-prose line-clamp-1'>{doctorName}</h3>
        <p className='text-sm max-w-prose line-clamp-2 mt-1'>
          {description}
          <span className='sm:hidden'>lebih banyak...</span>
        </p>
        <div className='flex justify-between items-center h-10 mt-3'>
          <div>
            <p className='text-sm text-gray-700'>
              Kapasitas: <span>{capacity}</span>
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-700'>
              Terdaftar: <span>{totalRegistered}</span>
            </p>
          </div>
          <div className='flex space-x-3'>
            <ButtonAction id={id} secondary className='hidden sm:block' onClick={onSelectMore}>
              Lebih Banyak
            </ButtonAction>
            <ButtonAction id={id} className='hidden sm:block' onClick={onRegister}>
              Daftar
            </ButtonAction>
          </div>
        </div>
      </div>
    </div>
  );
}

AppointmentCard.propTypes = {
  id: PropTypes.string.isRequired,
  onSelectMore: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default AppointmentCard;
