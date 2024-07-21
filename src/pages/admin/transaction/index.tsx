import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"


const Transaction = () => {
    return (
        <DefaultLayout>
            <div className="rounded-md  bg-white p-4 lg:px-7.5 lg:py-6 shadow-default dark:border-strokedark mb-4">
                <div className=" rounded-full ">
                    <div className="grid ">
                        <div className="flex-col space-y-3 my-auto">
                            <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Halaman Petugas </h1>
                            <p className="text-gray-500 text-sm md:text-base" >Ini adalah halaman transaksi dimana anda dapat melihat transaksi online maupun online</p>
                        </div>
                    </div>
                </div>
            </div>
            <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>NO</TableColumn>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>JUMLAH</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>TIPE TRANSAKSI</TableColumn>
                    <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>1</TableCell>
                        <TableCell>12112ASJKJ88</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell><ButtonPrimary className="w-full rounded-md" >Detail</ButtonPrimary></TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </DefaultLayout>
    )
}

export default Transaction