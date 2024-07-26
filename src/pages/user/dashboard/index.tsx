import Card from "../../../components/elemets/card/Card"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { manusiaLaptop } from "../../../image"
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";

import CardProduct from "../../../components/fragments/CardProduct/CardProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { getAllProduct } from "../../../service/product";
import { getCategories } from "../../../service/category";
import { formatRupiah } from "../../../utils/helper";


const DashboardUser = () => {
    const name = localStorage.getItem('name');
    // untuk dropdown
    const [searchData, setSearchData] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getAllProduct((result: any) => {
            setProduct(result.data)
        })

        getCategories((result: any) => {
            setCategories(result.data)
        })
    }, []);

    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };

    const filteredData = product.filter((item: any) => {
        return (
            item.title && item.title.toLowerCase().includes(searchData.toLowerCase()) &&
            (selectedCategory === "" || item.category?._id === selectedCategory)
        );
    });



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

                    {categories.map((item: any, index: any) => (
                        <SwiperSlide key={index} className="cursor-pointer" onClick={() => setSelectedCategory(item._id)}>
                            <div className="image flex-col justify-center items-center  p-3 rounded-md  " style={{ pointerEvents: 'none' }}  >
                                <div className="bg-[#f1faee] p-4 rounded-xl " >
                                    <img className={`w-[100px] h-[100px] mx-auto rounded-md object-cover `}
                                        src={item.image} alt={'image kategori'} />
                                    <p className="text-sm md:text-base font-semibold mt-4 text-center">{item.name}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}


                </Swiper>
            </Card>


            <div className="w-full  mt-4 relative ">
                <input onChange={handleSearch} className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="ketik laporan..." name="" id="" />
                <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-3" >
                {filteredData.map((item: any, index: number) => (
                    <CardProduct key={index} location={`/dashboard-user/detail-product/${item._id}`}
                        title={item.title}
                        price={formatRupiah(item.price)}
                        image={item.images?.[0]}
                    />
                ))}
            </div>

        </DefaultLayout >
    )
}

export default DashboardUser