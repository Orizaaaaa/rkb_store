
import React, { useEffect, useState } from 'react'
import Card from '../../../components/elemets/card/Card'
import DefaultLayout from '../../../components/layout/DefaultLayout'
import { manusiaLaptop } from '../../../image'
import { getDataPerMonth, statusDashboard } from '../../../service/dashboard'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Report {
    Processed: number
    Paid: number
    Success: number
}

const DashboardAdmin = () => {

    const [dataDashboard, setDataDashboard] = useState({} as Report);
    const [dataChart, setDataChart] = useState([] as any)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        statusDashboard((result: any) => {
            setDataDashboard(result.data)
            setLoading(false)
        })
        getDataPerMonth((result: any) => {
            setDataChart(result.data);
        })
    }, []);


    //card
    const dataCard = [

        {
            name: 'Di Proses',
            value: dataDashboard?.Processed
        },
        {
            name: 'Di Bayar',
            value: dataDashboard?.Paid
        },
        {
            name: 'Selesai',
            value: dataDashboard?.Success
        },

    ]

    const filteringTransaction = dataChart?.map((item: any) => {
        return item.totalTransactions
    })
    const filteringAmount = dataChart?.map((item: any) => {
        return item.totalAmount
    })


    const colorCard = (value: string) => {
        if (value === 'Di Proses') {
            return ('text-[#FF7F0A]')
        } else if (value === 'Di Bayar') {
            return ('text-primary')
        } else if (value === 'Selesai') {
            return ('text-lime-700')
        }

    }

    const data: ChartData<'line'> = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: ' Penjualan per bulan',
                data: filteringTransaction,
                borderColor: "#00B2FF",
                backgroundColor: "#00B2FF",

            },
            {
                label: ' Pendapatan',
                data: filteringAmount,
                borderColor: "green",
                backgroundColor: "green",

            },

        ],

    }


    const options: ChartOptions<'line'> = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
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
                text: 'Data Penjualan Selama 1 Tahun',
                font: {
                    size: 20,
                    family: 'Inter',
                },
                align: 'start'
            },


        },
    }



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
                    <React.Fragment key={index}>
                        {loading ? (
                            <Card >
                                <div role="status" className="max-w-sm animate-pulse flex-col justify-center items-center">
                                    <div className="h-4 bg-gray-300 rounded-md  max-w-[360px] mb-2.5"></div>
                                    <div className="h-7  w-7  bg-gray-300 rounded-md mb-4"></div>
                                </div>
                            </Card>
                        ) : (<Card >
                            <div className="flex-col">
                                <h1>{item.name}</h1>
                                <h1 className={`text-2xl font-semibold ${colorCard(item.name)}`}>{item.value}</h1>
                            </div>
                        </Card>)
                        }
                    </React.Fragment>
                ))}
            </div >

            <Card >
                <Line data={data} options={options} height={90} />
            </Card>



        </DefaultLayout>

    )
}

export default DashboardAdmin