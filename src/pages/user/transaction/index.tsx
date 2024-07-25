import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"
import { useNavigate } from "react-router-dom";

const TransactionUser = () => {
    const navigate: any = useNavigate();
    return (
        <DefaultLayout>
            <div className="rounded-md  bg-white p-4 lg:px-7.5 lg:py-6 shadow-default dark:border-strokedark mb-4">
                <div className=" rounded-full ">
                    <div className="grid ">
                        <div className="flex-col space-y-3 my-auto">
                            <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Halaman Transaksi </h1>
                            <p className="text-gray-500 text-sm md:text-base" >Ini adalah halaman transaksi dimana anda dapat melihat transaksi online yang telah anda buat</p>
                        </div>
                    </div>
                </div>
            </div>
            <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>NO</TableColumn>
                    <TableColumn>NAMA BARANG</TableColumn>
                    <TableColumn>HARGA</TableColumn>
                    <TableColumn>JUMLAH</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>TIPE TRANSAKSI</TableColumn>
                    <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>1</TableCell>
                        <TableCell>12112ASJKJ88</TableCell>
                        <TableCell>250.000</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>Belum Dibayar</TableCell>
                        <TableCell>online</TableCell>
                        <TableCell><ButtonPrimary onClick={() => navigate("/transaction-user/detail")} className="w-full rounded-md" >Detail</ButtonPrimary></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </DefaultLayout>
    )
}

export default TransactionUser