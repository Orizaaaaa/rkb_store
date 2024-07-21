
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { IoSearch } from "react-icons/io5"
import { useEffect, useState } from "react"
import { getAllReport } from "../../../service/report"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"
import CardLoading from "../../../components/fragments/CardLoading/CardLoading"
import CardProduct from "../../../components/fragments/CardProduct/CardProduct"
import { Link } from "react-router-dom"


const ReportAdmin = () => {
    const [loading, setLoading] = useState(false)
    const [dataReport, setDataReport] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [searchData, setSearchData] = useState("");
    const dispatch = useDispatch();
    const report = useSelector((state: any) => state.report.reportList);


    // useEffect(() => {
    //     if (report.length < 1) {
    //         setLoading(true)
    //         getAllReport((result: any) => {
    //             dispatch(addReport(result.data));
    //             setDataReport(result.data);
    //             setLoading(false)
    //         });
    //     } else {
    //         setDataReport(report);
    //         setLoading(false)
    //     }
    // }, []);


    const handleStatusSelect = (status: any) => {
        setSelectedStatus(status);
    };

    useEffect(() => {
        getAllReport((result: any) => {
            setDataReport(result.data)
        })
    }, []);

    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };

    const filteredData = dataReport.filter((item: any) => {
        return (
            item.title && item.title.toLowerCase().includes(searchData.toLowerCase()) &&
            (selectedStatus === "" || item.status === selectedStatus)
        );
    });


    return (
        <DefaultLayout>
            <div className="w-full mt-4 relative ">
                <input onChange={handleSearch} className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="ketik laporan..." name="" id="" />
                <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex mt-4 gap-3">
                <Link to={"/dashboard-user/buat-laporan-user"} className="bg-primary border-none text-white px-4 py-2 rounded-md " >
                    Tambah Product
                </Link>

                {/* dropdown status */}
                <Dropdown>
                    <DropdownTrigger>
                        <Button className=" bg-white text-primary text-md font-medium rounded-md"
                        >
                            Category
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="Semua Status" onClick={() => handleStatusSelect("")}>Semua Status</DropdownItem>
                        <DropdownItem key="Menunggu" onClick={() => handleStatusSelect("Menunggu")}> Menunggu</DropdownItem>
                        <DropdownItem onClick={() => handleStatusSelect("Diproses")} key="Diproses">Di Proses</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-3">
                {loading ? (
                    <CardLoading />
                ) : (

                    <CardProduct location="/laporan-admin/submit-laporan-admin/"
                        title="Jersey Arsenal "
                        price="Rp.250.000"
                        image={'https://www.adidas.co.id/media/catalog/product/i/t/it6141_2_apparel_photography_front20center20view_grey.jpg'}
                    />

                )}
            </div>

        </DefaultLayout>
    )
}

export default ReportAdmin