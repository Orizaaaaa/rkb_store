import Card from "../../../components/elemets/card/Card"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { manusiaLaptop } from "../../../image"
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getAllReport } from "../../../service/report";
import CardProduct from "../../../components/fragments/CardProduct/CardProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";


const DashboardUser = () => {

    const name = localStorage.getItem('name');

    // untuk dropdown
    const [searchData, setSearchData] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [dataReport, setDataReport] = useState([]);

    useEffect(() => {
        getAllReport((result: any) => {
            const data = result.data ? result.data.filter((report: any) => report.reporter.name === localStorage.getItem('name')) : [];
            setDataReport(data);
        });
    }, []);





    // const filteredData = dataReport.filter((item: any) => {
    //     return (
    //         item.title && item.title.toLowerCase().includes(searchData.toLowerCase()) &&
    //         (selectedStatus === "" || item.status === selectedStatus)
    //     );
    // });

    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };


    return (
        <DefaultLayout>
            <Card>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex-col space-y-3 my-auto">
                        <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Selamat datang di dashboard perbelanjaan {name} </h1>
                        <p className="text-gray-500 text-sm md:text-base" >Senang melihat Anda kembali. Mari kita mulai hari ini dengan membeli kaos yang anda impikan</p>
                    </div>
                    <div className="flex justify-center">
                        <img src={manusiaLaptop} alt="dashboard" />
                    </div>
                </div>
            </Card >


            <Card className="mt-4" >
                <h1 className="text-lg font-semibold" >Kategori Pilihan</h1>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={1}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper "
                >
                    <SwiperSlide>
                        <div className="image flex-col justify-center items-center  p-3 rounded-md " style={{ pointerEvents: 'none' }}  >
                            <div className="bg-[#f1faee] p-4 rounded-xl" >
                                <img className={`w-[100px] h-[100px] mx-auto rounded-md object-cover `}
                                    src={'https://www.adidas.co.id/media/catalog/product/i/t/it6141_2_apparel_photography_front20center20view_grey.jpg'} alt={'image kategori'} />
                                <p className="text-sm md:text-base font-semibold mt-4 text-center">FOOTBAL JERSEY</p>
                                <p className="text-sm md:text-base  text-gray-500  text-center">1000 Product Tersedia</p>
                            </div>

                        </div>
                    </SwiperSlide>

                </Swiper>
            </Card>


            <div className="w-full  mt-4 relative ">
                <input onChange={handleSearch} className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="ketik laporan..." name="" id="" />
                <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-3" >
                <CardProduct location="/dashboard-user/detail-product"
                    title="Jersey Arsenal "
                    price="Rp.250.000"
                    image={'https://www.adidas.co.id/media/catalog/product/i/t/it6141_2_apparel_photography_front20center20view_grey.jpg'}
                />
            </div>

        </DefaultLayout >
    )
}

export default DashboardUser