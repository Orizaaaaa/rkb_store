
import { useState } from 'react'
import Card from '../../../components/elemets/card/Card'
import DefaultLayout from '../../../components/layout/DefaultLayout'
import { manusiaLaptop } from '../../../image'
// import { statusDashboard } from '../../../service/dashboard'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// interface Report {
//     Menunggu: number
//     Diproses: number
//     Selesai: number
// }

const DashboardAdmin = () => {
    // const [dataDashboard, setDataDashboard] = useState({} as Report);
    const [loading, setLoading] = useState(false)
    // useEffect(() => {
    //     setLoading(true)
    //     statusDashboard((result: any) => {
    //         setDataDashboard(result.data)
    //         setLoading(false)
    //     })
    // }, []);


    //card
    const dataCard = [

        {
            name: 'Menunggu',
            value: '5'
        },
        {
            name: 'Di Proses',
            value: '9'
        },
        {
            name: 'Selesai',
            value: '30'
        },

    ]

    const colorCard = (value: string) => {
        if (value === 'Di Proses') {
            return ('text-[#FF7F0A]')
        } else if (value === 'Menunggu') {
            return ('text-primary')
        } else if (value === 'Selesai') {
            return ('text-lime-700')
        }

    }

    const data: ChartData<'line'> = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Data Penjualan',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: "#00B2FF",
                backgroundColor: "#00B2FF",

            },

        ],

    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    textAlign: 'center',
                }
            },

            title: {
                display: true,
                text: 'Data Penjualan Selama 7 Bulan',
                font: {
                    size: 20,
                    family: 'Inter',
                },
                align: 'start'
            },


        },
    };



    return (
        <DefaultLayout>
            <Card>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex-col space-y-3 my-auto">
                        <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Selamat datang di dashboard Admin !</h1>
                        <p className="text-gray-500 text-sm md:text-base" >Senang melihat Anda kembali. Mari kita mulai hari ini dengan mengelola barang untuk RKB Store</p>
                    </div>
                    <div className="flex justify-center">
                        <img src={manusiaLaptop} alt="dashboard" />
                    </div>
                </div>
            </Card>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">

                {dataCard.map((item, index) => (
                    <>
                        {loading ? (
                            <Card>
                                <div role="status" className="max-w-sm animate-pulse flex-col justify-center items-center">
                                    <div className="h-4 bg-gray-300 rounded-md  max-w-[360px] mb-2.5"></div>
                                    <div className="h-7  w-7  bg-gray-300 rounded-md mb-4"></div>
                                </div>
                            </Card>
                        ) : (<Card key={index}>
                            <div className="flex-col">
                                <h1>{item.name}</h1>
                                <h1 className={`text-2xl font-semibold ${colorCard(item.name)}`}>{item.value}</h1>
                            </div>
                        </Card>)
                        }
                    </>
                ))}
            </div >

            <Card >
                <Line data={data} options={options} height={90} />;
            </Card>



        </DefaultLayout>

    )
}

export default DashboardAdmin