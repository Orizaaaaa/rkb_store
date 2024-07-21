import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import Maps from "../../../components/fragments/maps/Maps";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import ButtonPrimary from "../../../components/elemets/buttonPrimary";
import { useEffect, useRef, useState } from "react";
import { getAllUnitWork } from "../../../service/unitWork";
import { useNavigate, useParams } from "react-router-dom";
import { assignReport, deleteReport, getReportById } from "../../../service/report";
import { capitalizeWords, formatDate, parseCoordinate } from "../../../utils/helper";
import { coment } from "../../../service/coment";
import Card from "../../../components/elemets/card/Card";

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
    unitWorks: any
    officerReport: {
        imageReport: string[]
    }

}

const SubmitReport = () => {
    const name = localStorage.getItem("name");

    const { id = "" } = useParams();
    const [unitKerja, setUnitKerja] = useState([]);
    const [formComent, setFormComent] = useState({
        id_report: id,
        message: ''
    })
    const [dataReport, setDataReport] = useState<Report | null>(null);
    const [formData, setFormData] = useState({
        report_id: id,
        unit_work_id: ''
    })

    //ngambil laporan dan unit kerja
    useEffect(() => {
        //fetch laporan
        getReportById(id, (result: any) => {
            console.log(result);
            setDataReport(result.data)
        })

        //fetch unit kerja 
        getAllUnitWork((result: any) => {
            const data = result.unitWork
            setUnitKerja(data)
        })
    }, [])

    //value dropdown
    const dataDropdown = unitKerja.map((unit: { name: string, _id: string }) => ({
        label: unit.name,
        value: unit._id,
    }));

    //ambil data dropdown
    const getItem = (item: any) => {
        setFormData({ ...formData, unit_work_id: item.value })
    }
    const dataDetailLaporan = [
        {
            title: 'Judul Laporan  ',
            text: dataReport?.title
        },
        {
            title: 'Nomor Laporan ',
            text: dataReport?._id
        },
        {
            title: 'Tanggal Laporan  ',
            text: formatDate(dataReport?.createdAt || '')
        },
        {
            title: 'Kategori Laporan  ',
            text: dataReport?.category?.name || "Tidak ada kategori"
        },
        {
            title: 'Lokasi Kejadian  ',
            text: dataReport?.address
        },
        {
            title: 'Status  ',
            text: dataReport?.status
        },
        {
            title: 'Deskripsi Laporan  ',
            text: dataReport?.description
        },
    ]

    //change button 
    const changeButton = (value: string) => {
        if (value === 'Diproses') {
            return ('hidden')
        } else if (value === 'Selesai') {
            return ('hidden')
        } else {
            return ('block')
        }
    }

    //send data to officer
    const handleAssign = (e: any) => {
        e.preventDefault()
        assignReport(formData, (status: boolean, res: any) => {
            if (status) {
                getReportById(id, (result: any) => {
                    console.log(result);
                    setDataReport(result.data)
                })
                console.log(res)
            }
        })
    }



    //coment
    const handleChangeComent = (e: any) => {
        setFormComent({ ...formComent, message: e.target.value })
    }



    //auto scroll
    const textRef = useRef<HTMLDivElement>(null);

    const pushComent = async (e: any) => {
        e.preventDefault()
        setFormComent({
            id_report: id,
            message: ''
        })
        await coment(formComent, (res: any) => {
            console.log(res);
            getReportById(id, (result: any) => {
                console.log(result);
                setDataReport(result.data)

                //auto scroll reff
                setTimeout(() => {
                    if (textRef.current) {
                        textRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 0);
            })

        })

    }

    //delete report
    const navigates: any = useNavigate()
    const handleDeleteReport = (value: any) => {
        deleteReport(value, (result: any) => {
            console.log(result);
            navigates('/laporan-admin')
        })
    }

    console.log(dataReport?.status);
    return (
        <DefaultLayout>
            <Card>
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
                        {dataReport?.status === 'Selesai' ? (
                            <>
                                <h1 className="text-lg font-semibold mb-2" >Bukti laporan dari unit kerja  </h1>
                                <img className="h-[170px] md:h-[300px] rounded-md w-auto  mx-auto" src={dataReport?.officerReport?.imageReport[0]} alt="" />
                            </>
                        ) : <img className="h-[170px] md:h-[300px] rounded-md w-auto  mx-auto" src={dataReport?.imageReport[0]} alt="" />}

                    </div>
                </div>


                {/* maps */}
                <Maps markerPosition={{
                    lat: parseCoordinate(dataReport?.latitude || '0'),
                    lng: parseCoordinate(dataReport?.longitude || '0'),
                }} zoom={10} text={`${dataReport?.address}`} className="h-[370px]  rounded-md my-5" />

                <form className="coment" onSubmit={pushComent}>
                    <h1 className="text-primary font-semibold">Komentar ({dataReport?.comment.length})</h1>
                    <div className="display-comment bg-slate-200 w-full h-60 rounded-md p-3 overflow-y-auto">
                        {dataReport?.comment.length === 0 && (
                            <p className="text-gray-400">Belum ada komentar</p>
                        )}

                        {dataReport?.comment.map((item: any, index) => (
                            <div key={index}>
                                {item.name !== name ? (
                                    <div className="comment my-3 p-2 bg-gray-500 w-fit rounded-tl-2xl rounded-r-xl" key={index} >
                                        <p className="text-white text-md">{capitalizeWords(item.name)}</p>
                                        <p className="text-white text-sm">{item.message}</p>
                                    </div>
                                ) : (
                                    <div ref={textRef} className="flex justify-end my-3">
                                        <div className="comment p-2 bg-primary w-fit rounded-tr-2xl rounded-l-xl  " key={index} >
                                            <p className="text-white text-md">{capitalizeWords(item.name)}</p>
                                            <p className="text-white text-sm">{item.message}</p>
                                        </div>
                                    </div>

                                )

                                }

                            </div>

                        ))}
                    </div>

                    <h1 className="mt-4">Pesan : </h1>
                    <label htmlFor="message"></label>
                    <input className="w-full h-9 rounded-md bg-gray-400 px-3 outline-none"
                        onChange={handleChangeComent}
                        type="text"
                        value={formComent.message}
                    />

                    <div className="flex justify-end">
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md mt-4">
                            Kirim pesan
                        </button>
                    </div>


                </form>

                {/* unit kerja */}
                <h1 className={`mt-2 text-lg font-semibold ${changeButton(dataReport?.status || '')}`} >Unit Kerja</h1>
                {dataReport?.unitWorks &&
                    <>
                        <p className="my-2" >Laporan ini telah di berikan ke petugas <b>{dataReport?.unitWorks.name}</b></p>
                        <img className="w-15 h-15 rounded-full" src={dataReport?.unitWorks.image[0]} alt="image" />
                    </>
                }


                {/* unit kerja dropdown */}
                <div className={`flex w-full flex-wrap md:flex-nowrap gap-4 ${changeButton(dataReport?.status || '')}`}>
                    <Autocomplete
                        label="Pilih Unit Kerja"
                        className="w-full"
                    >
                        {dataDropdown.map((item) => (
                            <AutocompleteItem key={item.value} value={item.value} onClick={() => getItem(item)}  >
                                {item.label}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>


                <ButtonPrimary className={`w-full rounded-md mt-3 ${changeButton(dataReport?.status || '')}`} onClick={handleAssign}  >
                    Kirim Laporan
                </ButtonPrimary>

                <ButtonPrimary type="button" onClick={() => handleDeleteReport(id)} className="w-full rounded-md mt-3" bg="bg-red-700"  >
                    Hapus Laporan
                </ButtonPrimary>
            </Card>
        </DefaultLayout>
    )
}

export default SubmitReport