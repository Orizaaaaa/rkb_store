
import { useEffect, useState } from "react"
import Maps from "../../../components/fragments/maps/Maps"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { getReportById } from "../../../service/report"
import { useParams } from "react-router-dom"
import { formatDate, parseCoordinate } from "../../../utils/helper"

interface Report {
    address: string;
    category: {
        name: string;
    };
    comment: string[];
    createdAt: string;
    description: string;
    imageReport: string[];
    latitude: string;
    longitude: string;
    reporter: string;
    status: string;
    title: string;
    updatedAt: string;
    _id: string;
    unitWorks: any;
}
const DetailRaportOfficer = () => {

    const { id }: any = useParams()
    const [dataReport, setDataReport] = useState<Report | null>(null);

    useEffect(() => {
        getReportById(id, (result: any) => {
            setDataReport(result.data)
        })
    }, []);
    const dataDetailLaporan = [
        { title: "Judul Laporan", text: dataReport?.title },
        { title: "Nomor Laporan", text: dataReport?._id },
        { title: "Tanggal Laporan", text: formatDate(dataReport?.createdAt || "") },
        { title: "Kategori Laporan", text: dataReport?.category.name || "" },
        { title: "Lokasi Kejadian", text: dataReport?.address },
        { title: "Status", text: dataReport?.status },
        { title: "Deskripsi Laporan", text: dataReport?.description },
    ];


    console.log(dataReport);

    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 lg:grid-cols-2 my-3 gap-8 lg:gap-0">
                <div className="left space-y-6">
                    {dataDetailLaporan.map((item, index) => (
                        <div className="text" key={index}>
                            <h1 className="text-lg font-semibold">{item.title} </h1>
                            <p>{item.text}</p>
                        </div>
                    ))}

                </div>
                <div className="right">
                    <img
                        className="h-[170px] md:h-[300px] rounded-md w-auto mx-auto"
                        src={dataReport?.imageReport[0]}
                        alt=""
                    />
                </div>
            </div>

            <Maps
                markerPosition={{
                    lat: parseCoordinate(dataReport?.latitude || "0"),
                    lng: parseCoordinate(dataReport?.longitude || "0"),
                }}
                zoom={10}
                text="Lokasi kejadian"
                className="h-[370px] rounded-md my-5"
            />

        </DefaultLayout>
    )
}

export default DetailRaportOfficer