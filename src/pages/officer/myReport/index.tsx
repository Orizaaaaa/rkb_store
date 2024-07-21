
import DefaultLayout from '../../../components/layout/DefaultLayout'
import { IoSearch } from 'react-icons/io5'
import Card from '../../../components/elemets/card/Card'
import { useEffect, useState } from 'react'
import { getReportByIdOfficer } from '../../../service/officer'
import CardReport from '../../../components/fragments/CardReport/CardReport'


const MyReportOfficer = () => {
    const id: any = localStorage.getItem('idOfficer')
    const [dataReport, setDataReport] = useState([])
    console.log(id);

    useEffect(() => {
        getReportByIdOfficer(id, (res: any) => {
            setDataReport(res.data)
        })
    }, []);

    console.log(dataReport);


    return (
        <DefaultLayout>
            <Card>
                <div className="grid ">
                    <div className="flex-col space-y-3 my-auto">
                        <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Halaman Laporan Saya </h1>
                        <p className="text-gray-500 text-sm md:text-base" >Ini adalah halaman pengaduan yang berisikan pengaduan yang telah anda selesaikan</p>
                    </div>
                </div>
            </Card >
            <div className="w-full  mt-4 relative ">
                <input className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="ketik laporan..." name="" id="" />
                <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6  gap-3" >

                {dataReport?.map((item: any, index: any) => (
                    <CardReport location={`/laporan-saya-officer/detail-laporan/${item._id}`}
                        image={item.imageReport.map((item: any) => item)} title={item.title} address={item.address} status={item.status}
                        date={item.createdAt} desc={item.description} key={index} />
                ))}
            </div>
        </DefaultLayout>
    )
}

export default MyReportOfficer