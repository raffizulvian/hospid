import PropTypes from 'prop-types';
import ButtonAction from '../button/ButtonAction';

function AppointmentRegisteredCard({ aid, doctorName, description, onCancel }) {
  return (
    <div className='flex flex-col justify-between p-4 mx-4 border shadow'>
      <div>
        <h3 className='text-xl font-semibold max-w-prose line-clamp-1'>{doctorName}</h3>
        <p className='text-sm max-w-prose line-clamp-2 mt-1'>
          {description}
          &nbsp;
          <span className='sm:hidden'>lebih banyak...</span>
        </p>
      </div>
      <div className='flex justify-end items-center space-x-2 h-10 mt-3'>
        <ButtonAction id={aid} className='' onClick={onCancel}>
          Batal
        </ButtonAction>
      </div>
    </div>
  );
}

AppointmentRegisteredCard.propTypes = {
  aid: PropTypes.string.isRequired,
  doctorName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AppointmentRegisteredCard;
