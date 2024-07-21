import { IoSearch } from "react-icons/io5"
import Card from "../../../components/elemets/card/Card"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { manusiaLaptop } from "../../../image"
import { getReportByUnitWork } from "../../../service/officer"
import { useEffect, useState } from "react"
import CardReport from "../../../components/fragments/CardReport/CardReport"


const DashboardOfficer = () => {

    const [dataReport, setDataReport] = useState([])
    const id: any = localStorage.getItem('id')

    useEffect(() => {
        getReportByUnitWork(id, (status: boolean, res: any) => {
            if (status) {
                setDataReport(res.data)
            } else {
                console.log(res);

            }
        })
    }, []);

    console.log(dataReport);


    return (
        <DefaultLayout>
            <Card>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex-col space-y-3 my-auto">
                        <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Selamat datang di dashboard Unit Kerja !</h1>
                        <p className="text-gray-500 text-sm md:text-base" >Senang melihat Anda kembali. Mari kita mulai hari ini dengan mem proses pengaudan yang telah di ajukan admin</p>
                    </div>
                    <div className="flex justify-center">
                        <img src={manusiaLaptop} alt="dashboard" />
                    </div>
                </div>
            </Card >
            <div className="w-full  mt-4 relative ">
                <input className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="ketik laporan..." name="" id="" />
                <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6  gap-3" >

                {dataReport?.map((item: any, index: any) => (
                    <CardReport location={`/dashboard-officer/submit-laporan-officer/${item._id}`}
                        image={item.imageReport.map((item: any) => item)} title={item.title} address={item.address} status={item.status}
                        date={item.createdAt} desc={item.description} key={index} />
                ))}

            </div>

        </DefaultLayout>
    )
}

export default DashboardOfficer