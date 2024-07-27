import { useEffect, useState } from "react";
import Card from "../../../components/elemets/card/Card"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { camera } from "../../../image"
import ButtonPrimary from "../../../components/elemets/buttonPrimary";
import { getDetailTransaction, updateTransaction } from "../../../service/transaction";
import { useParams } from "react-router-dom";
import { formatRupiah, statusText } from "../../../utils/helper";
import { postImage } from "../../../service/imagePost";

const TransactionDetailUser = () => {
    const { id }: any = useParams();
    const [detailTransaction, setDetailTransaction] = useState({} as any);

    useEffect(() => {
        getDetailTransaction(id, (result: any) => {
            setDetailTransaction(result.data)
        })
    }, []);

    const [formData, setFormData] = useState({
        status: "Dibayar",
        payment_document: null as File | null
    });

    const handleFileManager = (fileName: string) => {
        if (fileName === 'add') {
            const fileInput = document.getElementById("image-input-add") as HTMLInputElement | null;
            fileInput ? fileInput.click() : null;
        } else {
            console.log('error');

        }
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, InputSelect: string) => {
        if (InputSelect === 'add') {
            const selectedImage = e.target.files?.[0];
            setFormData({ ...formData, payment_document: selectedImage || null });
        } else {
            console.log('error');

        }
    };

    // submit data gambar sudah berhasil tapi get payments docs nya belum 
    const handleSubmit = async () => {
        const imageUrl = await postImage({ image: formData.payment_document });
        if (imageUrl) {
            const data = { status: formData.status, payment_document: imageUrl }
            updateTransaction(id, data, (result: any) => {
                if (result) {
                    getDetailTransaction(id, (result: any) => {
                        setDetailTransaction(result.data)
                    })
                }
            })
        }
    }


    return (
        <DefaultLayout>
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="left">
                        <div className="text">
                            <h1 className="text-lg font-medium text-gray-500"> Nama Pembeli </h1>
                            <p className="font-medium" >{detailTransaction?.user?.username}</p>
                        </div>
                        <div className="text mt-4">
                            <h1 className="text-lg font-medium text-gray-500 "> Nama Product </h1>
                            <p className="font-medium" >{detailTransaction?.product?.title}</p>
                        </div>
                        <div className="text mt-4">
                            <h1 className="text-lg font-medium text-gray-500"> Alamat Email </h1>
                            <p className="font-medium" >{detailTransaction?.user?.email}</p>
                        </div>
                        <div className="text mt-4">
                            <h1 className="text-lg font-medium text-gray-500"> Kuantitas </h1>
                            <p className="font-medium" >{detailTransaction?.quantity}</p>
                        </div>
                        <div className="text mt-4">
                            <h1 className="text-lg font-medium text-gray-500"> Jenis transaksi </h1>
                            <p className="font-medium" >{detailTransaction?.transaction_type}</p>
                        </div>
                        <div className="text mt-4">
                            <h1 className="text-lg font-medium text-gray-500"> Harga </h1>
                            <p className="font-medium" >{formatRupiah(detailTransaction.grandtotal)}</p>
                        </div>
                    </div>

                    <div className="right">
                        <div className="text">
                            <div className="status">
                                <p className={` font-medium text-end md:mr-15 rounded-md ${statusText(detailTransaction.status)}`} > {detailTransaction.status} </p>
                            </div>
                        </div>

                        {detailTransaction.payment_document ? (
                            <div className="image-transaction mt-4">
                                <img className=" w-auto md:h-[300px] rounded-md " src={detailTransaction.payment_document} alt="" />
                            </div>
                        ) : (
                            <>
                                <div className="images mt-3">
                                    {formData.payment_document && formData.payment_document instanceof Blob ? (
                                        <img className="h-[170px] md:h-[300px] w-auto mx-auto rounded-md" src={URL.createObjectURL(formData.payment_document)} />
                                    ) : (
                                        <div className="images border-dashed border-2 border-black rounded-md h-[200px] bg-gray-300">
                                            <button className="flex-col justify-center items-center h-full w-full " type="button" onClick={() => handleFileManager('add')} >
                                                <img className="w-20 h-20 mx-auto" src={camera} />
                                                <p>*Masukan bukti pembayaran</p>
                                            </button>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="image-input-add"
                                        onChange={(e) => handleImageChange(e, 'add')}
                                    />
                                    <div className="flex justify-center gap-3 mt-3">
                                        <button className={`border-2 border-primary  text-primary px-4 py-2 rounded-md ${formData.payment_document === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')} >Ubah Gambar</button>
                                    </div>
                                </div>
                                <ButtonPrimary onClick={handleSubmit} className="w-full mt-5 rounded-md"  >Simpan</ButtonPrimary>
                            </>
                        )}





                    </div>
                </div>
                <p className="mt-3" ><i>*Jika product sudah sesuai dengan yang anda inginkan, transfer ke rekening berikut (BCA) 12323232, pastikan harga sesuai dengan yang anda pesan</i></p>
            </Card>

        </DefaultLayout>
    )
}

export default TransactionDetailUser