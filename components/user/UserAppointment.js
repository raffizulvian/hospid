import PropTypes from 'prop-types';

import AppointmentRegisteredCard from '../appointment/AppointmentRegisteredCard';
import { ButtonLink } from '../button';

function UserAppointment({ appointments, onCancel, uid }) {
  return (
    <section className='py-4 space-y-4 overflow-y-auto'>
      {appointments.length > 0 &&
        appointments.map((appointment) => (
          <AppointmentRegisteredCard
            key={appointment.aid}
            aid={appointment.aid}
            doctorName={appointment.doctorName}
            description={appointment.description}
            onCancel={(e) => onCancel(e, uid, appointments)}
          />
        ))}

      {appointments.length === 0 && (
        <div className='flex flex-col justify-center items-center'>
          <h5 className='text-2xl mb-4'>Tidak ada konsultasi yang terdaftar</h5>
          <ButtonLink href='/konsultasi'>Daftar sekarang</ButtonLink>
        </div>
      )}
    </section>
  );
}

UserAppointment.propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCancel: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

export default UserAppointment;
