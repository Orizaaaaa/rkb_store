import { GrNotes } from "react-icons/gr";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { PiUserCircleGearFill } from "react-icons/pi";


export default function timeLine() {

  return (
    <div>
      {/* <!-- component --> */}
      <div className='min-h-screen bg-primary py-6 flex flex-col justify-center sm:py-12'>
        <div>
          <h1 className='text-center text-2xl md:text-5xl text-white font-extrabold mb-8 uppercase'>Alur Pembelian online</h1>
          <div className='py-3 sm:max-w-xl sm:mx-auto w-full px-2 sm:px-0'>
            <div className='relative text-gray-700 antialiased text-sm font-semibold'>
              {/* <!-- Vertical bar running through middle --> */}
              <div className='hidden sm:block w-1 bg-white absolute h-full left-1/2 transform -translate-x-1/2'></div>

              {/* <!-- Left section, set by justify-start and sm:pr-8 --> */}
              <div className='mt-6 sm:mt-0 sm:mb-12' data-aos='fade-up' data-aos-duration='1000'>
                <div className='flex flex-col sm:flex-row items-center'>
                  <div className='flex justify-start w-full mx-auto items-center'>
                    <div className='w-full sm:w-1/2 sm:pr-8'>
                      <div className='p-4 bg-white rounded shadow transition-all duration-100 ease-out hover:outline hover:outline-black hover:outline-1 cursor-pointer'>Lihat dan checkout pembelian kaos kamu </div>
                    </div>
                  </div>
                  <div className='rounded-full bg-blue-500 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center'>
                    <MdOutlineAddShoppingCart color="white" size={18} />
                  </div>
                </div>
              </div>

              {/* <!-- Right section, set by justify-end and sm:pl-8 --> */}
              <div className='mt-6 sm:mt-0 sm:mb-12' data-aos='fade-down' data-aos-duration='1000' data-aos-delay='500'>
                <div className='flex flex-col sm:flex-row items-center'>
                  <div className='flex justify-end w-full mx-auto items-center'>
                    <div className='w-full sm:w-1/2 sm:pl-8'>
                      <div className='p-4 bg-white rounded shadow transition-all duration-100 ease-out hover:outline hover:outline-black hover:outline-1 cursor-pointer'>Kirim bukti pembayaran kamu dan pastikan sesuai dengan harga yang tertera</div>
                    </div>
                  </div>
                  <div className='rounded-full p-1 bg-blue-500 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center'>
                    <GrNotes color="white" size={18} />
                  </div>
                </div>
              </div>

              {/* <!-- Left section, set by justify-start and sm:pr-8 --> */}
              <div className='mt-6 sm:mt-0 sm:mb-12' data-aos='fade-up' data-aos-duration='1000' data-aos-delay='1000'>
                <div className='flex flex-col sm:flex-row items-center'>
                  <div className='flex justify-start w-full mx-auto items-center'>
                    <div className='w-full sm:w-1/2 sm:pr-8'>
                      <div className='p-4 bg-white rounded shadow transition-all duration-100 ease-out hover:outline hover:outline-black hover:outline-1 cursor-pointer'>Admin akan mengirim pembelian kamu, berdasarkan lokasi yang anda isi</div>
                    </div>
                  </div>
                  <div className='rounded-full bg-blue-500 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center'>
                    <PiUserCircleGearFill color="white" size={18} />
                  </div>
                </div>
              </div>

              {/* <!-- Right section, set by justify-end and sm:pl-8 --> */}
              {/* <div className='mt-6 sm:mt-0' data-aos='fade-down' data-aos-duration='1000' data-aos-delay='1500'>
                <div className='flex flex-col sm:flex-row items-center'>
                  <div className='flex justify-end w-full mx-auto items-center'>
                    <div className='w-full sm:w-1/2 sm:pl-8'>
                      <div className='p-4 bg-white rounded shadow transition-all duration-100 ease-out hover:outline hover:outline-black hover:outline-1 cursor-pointer'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                    </div>
                  </div>
                  <div className='rounded-full bg-blue-500 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                      />
                    </svg>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
