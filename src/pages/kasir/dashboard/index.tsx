import { IoSearch } from "react-icons/io5"
import Card from "../../../components/elemets/card/Card"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { manusiaLaptop } from "../../../image"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllTransaction } from "../../../service/transaction"


const DashboardKasir = () => {
    const navigate: any = useNavigate();
    const [transaction, setTransaction] = useState([]);
    const [searchData, setSearchData] = useState("");
    useEffect(() => {
        getAllTransaction((result: any) => {
            setTransaction(result.data)
        })
    }, []);

    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };

    const filteredData = transaction.filter((item: any) => {
        return item?.user?.username.toLowerCase().includes(searchData.toLowerCase());
    });
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
                <input onChange={handleSearch} className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="Masukan nama pembeli ..." name="" id="" />
                <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <Table isStriped aria-label="Example static collection table ">
                <TableHeader>
                    <TableColumn>NO</TableColumn>
                    <TableColumn>NAMA</TableColumn>
                    <TableColumn>HARGA</TableColumn>
                    <TableColumn>JUMLAH</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>TIPE TRANSAKSI</TableColumn>
                    <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody>
                    {filteredData.map((item: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item?.user?.username}</TableCell>
                            <TableCell>{item.grandtotal}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.transaction_type}</TableCell>
                            <TableCell><ButtonPrimary onClick={() => navigate(`/dashboard-kasir/detail-transaction/${item._id}`)} className="w-full rounded-md" >Detail</ButtonPrimary></TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>

        </DefaultLayout>
    )
}

export default DashboardKasir