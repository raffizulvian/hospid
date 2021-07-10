import useSWR from 'swr';
import { AppointmentCard } from '../components/appointment';
import { get } from '../lib/client/fetcher';

function Konsultasi({ data: initialData }) {
  const { data } = useSWR('/api/appointments', get, { initialData });
  const { appointments } = data;

  return (
    <main className='main w-full overflow-x-hidden'>
      <section className='max-w-screen-md mx-auto space-y-4 py-3 overflow-y-auto'>
        {appointments.map((appointment) => {
          const slot = appointment.capacity - appointment.totalRegistered;
          return (
            <AppointmentCard
              key={appointment.aid}
              slot={slot}
              doctorName={appointment.doctorName}
              description={appointment.description}
              capacity={appointment.capacity}
              totalRegistered={appointment.totalRegistered}
            />
          );
        })}
      </section>
    </main>
  );
}

Konsultasi.layout = 'navbar';

export default Konsultasi;

export async function getServerSideProps() {
  const data = await get('http://localhost:3000/api/appointments');

  return { props: { data } };
}
