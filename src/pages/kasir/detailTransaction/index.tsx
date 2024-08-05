
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../../components/layout/DefaultLayout'
import { useEffect, useRef, useState } from 'react';
import { deleteTransaction, getDetailTransaction, updateTransaction } from '../../../service/transaction';
import { formatRupiah, statusText } from '../../../utils/helper';
import { Spinner, useDisclosure } from '@nextui-org/react';
import Card from '../../../components/elemets/card/Card';
import ButtonPrimary from '../../../components/elemets/buttonPrimary';
import animationTroli from '../../../assets/troliAnimation.json'
import animationTrans from '../../../assets/animationSearchTrans.json'
import { Player } from '@lottiefiles/react-lottie-player';
import AlertModal from '../../../components/fragments/modal/AlertModal';
import Invoice from '../../../components/fragments/Invoice/Invoice';
import { useReactToPrint } from 'react-to-print';
import { FaFileInvoiceDollar } from 'react-icons/fa6';

const DetailTransactionKasir = () => {
    const navigate = useNavigate();
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const { id }: any = useParams();
    const [transaction, setTransaction] = useState({}) as any;
    const [loading, setLoading] = useState(false);
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

    const changeStatus = async (value: string) => {
        setLoading(true)
        await updateTransaction(id, { status: value }, (result: any) => {
            console.log(result.data);
            getDetailTransaction(id, (result: any) => {
                setTransaction(result.data)
                setLoading(false)

            })
        })
    }

    const handleDeleteModal = () => {
        onWarningOpen();
    };

    const confirmDelete = () => {
        deleteTransaction(id, (result: any) => {
            console.log(result.data);
            navigate('/dashboard-kasir')
        })
    };

    const invoiceRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
    });

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

                        {transaction.transaction_type === 'online' && (
                            <>
                                <h1 className="text-lg font-medium text-gray-500 mt-4" >Ubah Status Transaksi</h1>
                                <div className="flex mt-2 gap-3">
                                    <button className='text-orange-400 border-2 border-orange-400 rounded-md px-4 py-2 min-w-27' onClick={() => changeStatus('Diproses')} >
                                        {loading ? <Spinner className={`w-5 h-5 `} size="sm" color="primary" /> : 'Diproses'}
                                    </button>
                                    <button className='text-primary border-2 border-primary rounded-md px-4 py-2 min-w-27' onClick={() => changeStatus('Dikirim')} >
                                        {loading ? <Spinner className={`w-5 h-5 `} size="sm" color="primary" /> : 'Dikirim'}
                                    </button>
                                    <ButtonPrimary className=" rounded-md min-w-27" onClick={() => changeStatus('Selesai')} >
                                        {loading ? <Spinner className={`w-5 h-5 `} size="sm" color="white" /> : 'Selesai'}
                                    </ButtonPrimary>
                                </div>
                            </>

                        )}
                    </div>

                    <div className="right">
                        <div className="text">
                            <div className="status">
                                <p className={`font-medium text-end md:mr-15 rounded-md ${statusText(transaction?.status)}`} >{transaction?.status}</p>
                            </div>


                        </div>

                        {transaction?.transaction_type === 'offline' ? (
                            <Player style={{ height: '300px' }} autoplay loop src={animationTroli} />
                        ) : (
                            <div className="image-transaction mt-4">
                                {transaction?.payment_document ? (
                                    <img className="w-auto md:h-[300px] rounded-md" src={transaction?.payment_document} alt="image" />
                                ) : (
                                    <Player style={{ height: '300px' }} autoplay loop src={animationTrans} />
                                )}
                            </div>
                        )}

                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <ButtonPrimary className="rounded-md bg-red-900 " onClick={handleDeleteModal}  >Hapus Transaksi</ButtonPrimary>
                    <button onClick={handlePrint} className="bg-primary text-white py-2 px-4 rounded flex items-center gap-2">
                        Cetak Invoice
                        <FaFileInvoiceDollar size={20} />
                    </button>
                </div>

                {/* Warning Modal */}
                <AlertModal isOpen={isWarningOpen} onClose={onWarningClose} onClick={confirmDelete} >
                    <p>Apakah anda yakin ingin menghapus Transaksi ini ?</p>
                </AlertModal>
            </Card>

            <div className="mt-10">
                <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} >
                    <Invoice name={transaction?.user?.username} date={transaction?.createdAt} ppn={transaction?.ppn} product={transaction?.product?.title} quantity={transaction?.quantity}
                        price={transaction?.grandtotal} transaction_type={transaction?.transaction_type} grandtotal={transaction?.grandtotal}
                        ref={invoiceRef} />
                </div>
            </div>
        </DefaultLayout>
    )


}

export default DetailTransactionKasir