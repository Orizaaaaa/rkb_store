import { useParams } from "react-router-dom";
import Card from "../../../components/elemets/card/Card"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { useEffect, useState } from "react";
import { getDetailTransaction } from "../../../service/transaction";
import { formatRupiah, statusText } from "../../../utils/helper";
import { Player } from "@lottiefiles/react-lottie-player";
import animationTroli from '../../../assets/troliAnimation.json'
import animationTrans from '../../../assets/animationSearchTrans.json'

const DetailTransaction = () => {
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


    console.log(transaction);



    return (
        <DefaultLayout>
            <Card >
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="left">
                        {dataLetf.map((item: any, index: number) => (
                            <div className="text mt-4" key={index}>
                                <h1 className="text-lg font-medium text-gray-500"> {item?.title} </h1>
                                <p className="font-medium" >{item?.text}</p>
                            </div>
                        ))}
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

            </Card>

        </DefaultLayout>
    )
}

export default DetailTransaction