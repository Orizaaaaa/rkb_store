
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../../components/layout/DefaultLayout'
import { useEffect, useState } from 'react';
import { getDetailTransaction } from '../../../service/transaction';
import { formatRupiah, statusText } from '../../../utils/helper';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import Card from '../../../components/elemets/card/Card';
import ButtonPrimary from '../../../components/elemets/buttonPrimary';


const DetailTransactionKasir = () => {

    const { id }: any = useParams();
    const [transaction, setTransaction] = useState({}) as any;
    useEffect(() => {
        getDetailTransaction(id, (result: any) => {
            console.log(result.data);
            setTransaction(result.data)
        })
    }, []);

    const dataLetf = [
        {
            title: 'Nama Pembeli',
            text: transaction?.user?.username
        },
        {
            title: 'Nama Product',
            text: transaction?.product?.title
        },
        {
            title: 'Kuantitas',
            text: transaction?.quantity
        },
        {
            title: 'Jenis Transaksi',
            text: transaction?.transaction_type
        },
        {
            title: 'Total Harga',
            text: formatRupiah(transaction?.grandtotal)
        },
    ]

    return (
        <DefaultLayout>
            <Card  >
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="left">
                        {dataLetf.map((item: any, index: number) => (
                            <div className="text mt-4" key={index}>
                                <h1 className="text-lg font-medium text-gray-500"> {item?.title} </h1>
                                <p className="font-medium" >{item?.text}</p>
                            </div>
                        ))}
                        <h1 className="text-lg font-medium text-gray-500 mt-4" >Ubah Status Transaksi</h1>
                        <div className="flex mt-2 gap-3">
                            <button className='text-primary border-2 border-primary rounded-md px-4 py-2' >Di Proses</button>
                            <ButtonPrimary className=" rounded-md" >Selesai</ButtonPrimary>
                        </div>
                    </div>

                    <div className="right">
                        <div className="text">
                            <div className="status">
                                <p className={`font-medium text-end md:mr-15 rounded-md ${statusText(transaction?.status)}`} >{transaction?.status}</p>
                            </div>
                        </div>

                        <div className="image-transaction mt-4">
                            <img className=" w-auto md:h-[300px] rounded-md " src={transaction?.payment_document} alt="image" />
                        </div>
                    </div>
                </div>

            </Card>

        </DefaultLayout>
    )


}

export default DetailTransactionKasir