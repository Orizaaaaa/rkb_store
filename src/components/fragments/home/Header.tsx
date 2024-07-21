import { Link } from 'react-router-dom';
import { useState } from 'react';
import { logo } from '../../../image';

const Header = () => {

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };
    return (
        <header>
            <nav className='bg-transparent '>
                <div className='mx-auto flex w-full flex-wrap items-center justify-between p-4'>
                    <div className='flex items-center justify-center'>
                        <div className=''>
                            <img src={logo} className='mr-2 md:h-9 h-8 w-auto' alt='Logo SerenityLink' />
                        </div>
                        <span className='self-center whitespace-nowrap text-lg md:text-2xl font-bold'>RKB<span className='text-primary'>Store.</span> </span>
                    </div>
                    <button
                        onClick={toggleNavbar}
                        type='button'
                        className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  md:hidden'
                        aria-controls='navbar-default'
                        aria-expanded='false'
                    >
                        <span className='sr-only'>Open main menu</span>
                        <svg className='h-5 w-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 14'>
                            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h15M1 7h15M1 13h15' />
                        </svg>
                    </button>
                    <div className={`w-full md:block md:w-auto ${isNavbarOpen ? 'block' : 'hidden'} z-10`} id='navbar-default'>
                        <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-transparent p-4 font-medium  md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0 '>
                            <li>
                                <Link to={"#"} className='font-semibold block rounded bg-primary py-2 pl-3 pr-4 text-white  md:bg-transparent md:p-0 md:text-primary ' aria-current='page'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a href='#alurAduan' className='font-semibold block rounded py-2 pl-3 pr-4 text-gray-950 hover:bg-gray-100 transition duration-300  md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-primary '>
                                    Alur Pembelian
                                </a>
                            </li>
                            <li>
                                <a href='#kategori' className='font-semibold block rounded py-2 pl-3 pr-4 text-gray-950 hover:bg-gray-100 transition duration-300  md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-primary '>
                                    Kategori
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
