import { IoSearch } from "react-icons/io5"
import Card from "../../../components/elemets/card/Card"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { manusiaLaptop } from "../../../image"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"
import { useNavigate } from "react-router-dom"


const DashboardKasir = () => {
    const navigate: any = useNavigate();


    return (
        <DefaultLayout>
            <Card>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex-col space-y-3 my-auto">
                        <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Selamat datang di dashboard Kasir</h1>
                        <p className="text-gray-500 text-sm md:text-base" >Senang melihat Anda kembali. Mari kita mulai hari ini dengan mem proses pembelian pelanggan</p>
                    </div>
                    <div className="flex justify-center">
                        <img src={manusiaLaptop} alt="dashboard" />
                    </div>
                </div>
            </Card >
            <div className="w-full  my-4 relative ">
                <input className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="ketik nama pembeli ..." name="" id="" />
                <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <Table isStriped aria-label="Example static collection table ">
                <TableHeader>
                    <TableColumn>NO</TableColumn>
                    <TableColumn>NAMA</TableColumn>
                    <TableColumn>TIPE TRANSAKSI</TableColumn>
                    <TableColumn>TOTAL HARGA</TableColumn>
                    <TableColumn>JUMLAH</TableColumn>
                    <TableColumn>STATUS</TableColumn>


                    <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>1</TableCell>
                        <TableCell>Oriza Sativa</TableCell>
                        <TableCell>online</TableCell>
                        <TableCell>250.000</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>Belum Dibayar</TableCell>
                        <TableCell><ButtonPrimary onClick={() => navigate("/transaction-admin/detail-transaction")} className="w-full rounded-md" >Detail</ButtonPrimary></TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </DefaultLayout>
    )
}

export default DashboardKasir