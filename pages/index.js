import Image from 'next/image';
import ButtonLink from '../components/button/ButtonLink';

function Home() {
  return (
    <main className='main w-full overflow-x-hidden overflow-y-auto'>
      <section className='flex flex-col-reverse justify-end items-center h-full max-w-screen-lg mx-auto px-[4%] py-8 lg:px-0 md:flex-row md:justify-between'>
        <div className='space-y-5 md:space-y-8 md:w-2/5'>
          <div className='space-y-3 md:space-y-8'>
            <h1 className='text-5xl font-semibold text-gray-900 md:text-7xl'>
              Daftar Konsultasi di Hospid
            </h1>
            <p className='text-lg text-gray-900 max-w-prose'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias tempora tenetur
              consectetur quam perspiciatis qui deleniti.
            </p>
          </div>
          <ButtonLink href='/' big>
            Daftar sekarang
          </ButtonLink>
        </div>
        <div className='w-72 h-72 md:w-[26rem] md:h-[26rem]'>
          <Image src='/doctor.svg' alt='' width={300} height={300} />
        </div>
      </section>
    </main>
  );
}

Home.id = 'home';
Home.layout = 'navbar';

export default Home;
