import Card from "../../../components/elemets/card/Card"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { manusiaLaptop } from "../../../image"
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllReport } from "../../../service/report";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import CardProduct from "../../../components/fragments/CardProduct/CardProduct";


const DashboardUser = () => {

    const name = localStorage.getItem('name');

    const [dataReport, setDataReport] = useState([]);

    useEffect(() => {
        getAllReport((result: any) => {
            const data = result.data ? result.data.filter((report: any) => report.reporter.name === localStorage.getItem('name')) : [];
            setDataReport(data);
        });
    }, []);


    // untuk dropdown
    const [searchData, setSearchData] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");


    const filteredData = dataReport.filter((item: any) => {
        return (
            item.title && item.title.toLowerCase().includes(searchData.toLowerCase()) &&
            (selectedStatus === "" || item.status === selectedStatus)
        );
    });

    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };

    const handleStatusSelect = (status: any) => {
        setSelectedStatus(status);
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

            <div className="w-full  mt-4 relative ">
                <input onChange={handleSearch} className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="ketik laporan..." name="" id="" />
                <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex mt-4 gap-3">
                <Link to={"/dashboard-user/buat-laporan-user"} className="bg-primary text-white px-4 py-2 rounded-md " >
                    Buat Laporan
                </Link>

                {/* dropdown status */}
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            Status
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="Semua Status" onClick={() => handleStatusSelect("")}>Semua Status</DropdownItem>
                        <DropdownItem key="Menunggu" onClick={() => handleStatusSelect("Menunggu")}> Menunggu</DropdownItem>
                        <DropdownItem onClick={() => handleStatusSelect("Diproses")} key="Diproses">Di Proses</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-3" >
                <CardProduct location="/product-admin/detail-product-admin"
                    title="Jersey Arsenal "
                    price="Rp.250.000"
                    image={'https://www.adidas.co.id/media/catalog/product/i/t/it6141_2_apparel_photography_front20center20view_grey.jpg'}
                />
            </div>

        </DefaultLayout >
    )
}

export default DashboardUser