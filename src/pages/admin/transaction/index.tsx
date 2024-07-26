import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllTransaction } from "../../../service/transaction";


const Transaction = () => {
    const navigate: any = useNavigate();
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        getAllTransaction((result: any) => {
            setTransaction(result.data)
        })
    }, []);

    console.log(transaction);


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
                    <TableColumn>ID</TableColumn>
                    <TableColumn>HARGA</TableColumn>
                    <TableColumn>JUMLAH</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>TIPE TRANSAKSI</TableColumn>
                    <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody>
                    {transaction.map((item: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item._id}</TableCell>
                            <TableCell>{item.grandtotal}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.transaction_type}</TableCell>
                            <TableCell><ButtonPrimary onClick={() => navigate(`/transaction-admin/detail-transaction/${item._id}`)} className="w-full rounded-md" >Detail</ButtonPrimary></TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </DefaultLayout>
    )
}

export default Transaction