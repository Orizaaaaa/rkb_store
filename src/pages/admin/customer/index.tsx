
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import DefaultLayout from '../../../components/layout/DefaultLayout'
import { useEffect, useState } from 'react';
import { getAllUser } from '../../../service/user';

const Customer = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUser((data: any) => {
            setUsers(data.data);
        })
    }, []);

    return (
        <DefaultLayout>
            <div className="rounded-md  bg-white p-4 lg:px-7.5 lg:py-6 shadow-default dark:border-strokedark mb-4">
                <div className=" rounded-full ">
                    <div className="grid ">
                        <div className="flex-col space-y-3 my-auto">
                            <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Halaman Customer </h1>
                            <p className="text-gray-500 text-sm md:text-base" >Ini adalah customer dimana anda dapat melihat semua customer termasuk role nya</p>
                        </div>
                    </div>
                </div>
            </div>
            <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>NO</TableColumn>
                    <TableColumn>NAMA</TableColumn>
                    <TableColumn>EMAIL</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>Alamat</TableColumn>
                </TableHeader>
                <TableBody>
                    {users.map((item: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item?.username}</TableCell>
                            <TableCell>{item?.email}</TableCell>
                            <TableCell>{item?.role}</TableCell>
                            <TableCell>{item?.address}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </DefaultLayout>
    )
}

export default Customer