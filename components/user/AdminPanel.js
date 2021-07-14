import { ButtonLink } from '../button';

function AdminPanel() {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-auto'>
      <div className='border border-purple-600 rounded-lg p-3 shadow'>
        <h2 className='text-lg font-medium text-gray-900'>Buat Konsultasi Baru</h2>
        <p className='text-gray-900 mt-1'>
          Membuat jadwal konsultasi dokter baru. Silakan persiapkan data yang dibutuhkan.
        </p>
        <ButtonLink href='/admin/baru' className='mt-2'>
          Konsultasi Baru
        </ButtonLink>
      </div>

      <div className='border border-purple-600 rounded-lg p-3 shadow'>
        <h2 className='text-lg font-medium text-gray-900'>Sunting Data Konsultasi</h2>
        <p className='text-gray-900 mt-1'>
          Ubah data jadwal konsultasi dokter. Silakan menuju halaman daftar konsultasi.
        </p>
        <ButtonLink href='/konsultasi' className='mt-2'>
          Menuju Konsultasi
        </ButtonLink>
      </div>

      <div className='border border-purple-600 rounded-lg p-3 shadow'>
        <h2 className='text-lg font-medium text-gray-900'>Hapus Jadwal Konsultasi</h2>
        <p className='text-gray-900 mt-1'>
          Menghapus jadwal konsultasi dokter. Silakan menuju halaman konsultasi.
        </p>
        <ButtonLink href='/konsultasi' className='mt-2'>
          Menuju Konsultasi
        </ButtonLink>
      </div>
    </section>
  );
}

AdminPanel.propTypes = {};

export default AdminPanel;
