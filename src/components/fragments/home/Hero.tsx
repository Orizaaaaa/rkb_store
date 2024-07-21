import { Link } from 'react-router-dom';
import { bigLogo } from '../../../image';
function Hero() {
  return (
    <>
      <section className=' min-h-[92vh] bg-[#f1faee] grid grid-cols-1 items-center px-4 pb-20 pt-5 md:px-20 lg:grid-cols-5 overflow-x-hidden '
      >
        <div className='animate__fadeInLeft animate__animated animate__delay-0.7s order-last py-4 md:order-first md:py-0 lg:pr-8 col-span-3'>
          <h1 className='mt-0 text-2xl font-bold font-inter md:mt-4  lg:text-6xl text-black '>  Revolusi Kaos Bandung  <span className='text-primary' >Store.</span>  </h1>
          <p className='mt-10' >Merupakan website yang menyediakan berbagai macam kaos kekinian dengan transaksi online atau pun offline, jelajahi
            website kami sekarang dan belanja kaos yang anda sukai
          </p>

          <Link to={'/login'} >
            <div className='mt-8 inline-flex items-center rounded-full bg-primary px-4 py-2 font-medium text-white '>
              Beli Kaos
            </div>
          </Link>
        </div>
        <div className='animate__fadeInRight animate__animated animate__delay-0.7s group order-first mx-auto max-w-md pb-12 pt-24 md:order-last lg:pl-20 col-span-2'>
          <div className='relative' style={{ transform: 'perspective(1000px) rotate(0deg) rotateY(0deg) scale3d(1,1,1)', willChange: 'transform' }}>
            <div className='flex w-full h-full items-center justify-center overflow-hidden  bg-transparent'>
              <img className='' src={bigLogo} alt='logo' />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
