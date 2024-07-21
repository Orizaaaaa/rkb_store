
import { useEffect, useRef, useState } from "react";

import NavigationList from "../NavigationList/NavigationList";
import { RxDashboard } from "react-icons/rx";
import { FaBookReader } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logo2 } from "../../../image";
import { FaBookOpen, FaMoneyBills } from "react-icons/fa6";
import ModalDefault from "../modal/Modal";
import { useDisclosure } from "@nextui-org/react";
import { Player } from "@lottiefiles/react-lottie-player";
import animationLogout from "../../../assets/logoutAnimation.json";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoMdPeople, IoMdPricetags } from "react-icons/io";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {

  const { onOpen, onClose, isOpen } = useDisclosure();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const [count, setCount] = useState(5);

  const navigates = useNavigate();


  //login time
  useEffect(() => {

    // Mendapatkan waktu login dari localStorage
    const loginTimeStr = localStorage.getItem('loginTime');

    if (loginTimeStr) {
      // Konversi waktu login dari string ke objek Date
      const loginTime = new Date(parseInt(loginTimeStr, 10));

      // Waktu saat ini
      const currentTime = new Date();

      // Menghitung selisih waktu dalam milidetik
      const diff = currentTime.getTime() - loginTime.getTime();

      // Mengubah milidetik ke menit
      const diffMinutes = Math.floor(diff / 60000);

      // Cek jika selisih waktu lebih dari sehari
      if (diffMinutes > 1440) {
        onOpen();
        // Atur count sesuai kebutuhan
        const timer = setInterval(() => {
          setCount(prevCount => {
            if (prevCount > 0) {
              return prevCount - 1;
            } else {
              clearInterval(timer);
              navigates('/login');
              localStorage.clear();
              return 0; // Pastikan count kembali ke 0 setelah navigasi dilakukan
            }
          });
        }, 1000);

        return () => clearInterval(timer);
      }
    }
  }, []);

  // sidebar validation
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  //role localStorage
  const role: any = localStorage.getItem('role')


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });


  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });



  const setSidebar = (role: string) => {
    if (role === 'user') {
      return (
        <>
          <NavigationList icon={<RxDashboard size={19} />} title="Dasboard" pathname="/dashboard-user" />
          <NavigationList icon={<FaBookReader size={19} />} title="Laporan Saya" pathname="/laporan-saya-user" />
          <NavigationList icon={<FaBookOpen size={19} />} title="Semua Laporan" pathname="/semua-laporan-user" />
          <button className="border-2 border-[#2FACD6] py-1 rounded-md text-[#2FACD6] font-medium" onClick={handleLogout} >Logout</button>
        </>
      )
    } else if (role === 'officer') {
      return (
        <>
          <NavigationList icon={<RxDashboard size={19} />} title="Dasboard" pathname="/dashboard-officer" />
          <NavigationList icon={<FaBookReader size={19} />} title="Laporan Saya" pathname="/laporan-saya-officer" />
          <button className="border-2 border-[#2FACD6] py-1 rounded-md text-[#2FACD6] font-medium" onClick={handleLogout} >Logout</button>
        </>
      )
    } else if (role === 'admin') {
      return (
        <>
          <NavigationList icon={<RxDashboard size={19} />} title="Dasboard" pathname="/dashboard-admin" />
          <NavigationList icon={<MdOutlineAddShoppingCart size={19} />} title="Product" pathname="/product-admin" />
          <NavigationList icon={<IoMdPricetags size={19} />} title="Kategori" pathname="/kategori-admin" />
          <NavigationList icon={<FaMoneyBills size={19} />} title="Transaksi" pathname="/transaction-admin" />
          <NavigationList icon={<IoMdPeople size={19} />} title="Customer" pathname="/customer-admin" />
          <button className="border-2 border-[#2FACD6] py-1 rounded-md text-[#2FACD6] font-medium" onClick={handleLogout} >Logout</button>
        </>
      )


    }
  }

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between lg:justify-center gap-2 px-6 py-5.5 lg:py-6.5">
        <Link to="/">
          <img className="w-full" src={logo2} alt="logo" />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}

              {/* modal dan sidebar */}
              {setSidebar(role)}
              <ModalDefault isOpen={isOpen} onClose={onClose} closeButton={true} >
                <Player autoplay loop src={animationLogout} />
                <h1 className="text-center text-lg">Sesi login kamu akan berakhir, silahkan login kembali...</h1>
                <h2 className="text-center text-xl font-semibold text-red-600" >{count}</h2>

              </ModalDefault>


              {/* <!-- Menu Item Calendar -->
              <NavigationList icon={<IoCalendarOutline size={19} />} title="Calendar" pathname="/calendar" /> */}


              {/* <!-- Menu Item Profile --> */}
              {/* <NavigationList icon={<IoPersonOutline size={19} />} title=" Profile" pathname="/profile" /> */}


              {/* <!-- Dropdown Menu Start --> */}



              {/* <!-- Menu Item Tables --> */}
              {/* <NavigationList icon={<MdOutlineTableChart size={19} />} title=" Tables" pathname="/tables" /> */}


              {/* <!-- Menu Item Settings --> */}
              {/* <NavigationList icon={<IoSettingsOutline size={19} />} title="Settings" pathname="/settings" /> */}


            </ul>
          </div>

        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
