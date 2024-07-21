
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import DefaultLayout from '../../../components/layout/DefaultLayout'

const Customer = () => {
    return (
        <DefaultLayout>
            <div className="rounded-md  bg-white p-4 lg:px-7.5 lg:py-6 shadow-default dark:border-strokedark mb-4">
                <div className=" rounded-full ">
                    <div className="grid ">
                        <div className="flex-col space-y-3 my-auto">
                            <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Halaman Transaksi </h1>
                            <p className="text-gray-500 text-sm md:text-base" >Ini adalah halaman transaksi dimana anda dapat melihat transaksi online maupun online</p>
                        </div>
                    </div>
                </div>
            </div>
            <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>NO</TableColumn>
                    <TableColumn>NAMA</TableColumn>
                    <TableColumn>EMAIL</TableColumn>
                    <TableColumn>NO HP</TableColumn>
                    <TableColumn>Alamat</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>1</TableCell>
                        <TableCell>Gabriel Babi</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>082323877656</TableCell>
                        <TableCell>Jalan babi, kecamatan lembang, kabupaten lembang...</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </DefaultLayout>
    )
}

export default Customer