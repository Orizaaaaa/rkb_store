import { useState } from "react";
import Card from "../../../components/elemets/card/Card"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { camera, jalanRusak } from "../../../image"
import ButtonPrimary from "../../../components/elemets/buttonPrimary";

const TransactionDetailUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: null as File | null
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
            setFormData({ ...formData, image: selectedImage || null });
        } else {
            console.log('error');

        }
    };

    // ini adalah contoh ketika data dari API ada atau tidak ada
    const contohImageAPI = false
    return (
        <DefaultLayout>
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="left">
                        <div className="text">
                            <h1 className="text-lg font-medium text-gray-500"> Nama Pembeli </h1>
                            <p className="font-medium" >Oriza Sativa</p>
                        </div>
                        <div className="text mt-4">
                            <h1 className="text-lg font-medium text-gray-500 "> Nama Product </h1>
                            <p className="font-medium" >Sampah</p>
                        </div>
                        <div className="text mt-4">
                            <h1 className="text-lg font-medium text-gray-500"> Alamat Email </h1>
                            <p className="font-medium" >oryzasativacikal@gmail</p>
                        </div>
                        <div className="text mt-4">
                            <h1 className="text-lg font-medium text-gray-500"> Kuantitas </h1>
                            <p className="font-medium" >2</p>
                        </div>
                        <div className="text mt-4">
                            <h1 className="text-lg font-medium text-gray-500"> Jenis transaksi </h1>
                            <p className="font-medium" >online</p>
                        </div>
                        <div className="text mt-4">
                            <h1 className="text-lg font-medium text-gray-500"> Harga </h1>
                            <p className="font-medium" >Rp.250.000</p>
                        </div>
                    </div>

                    <div className="right">
                        <div className="text">
                            <div className="status">
                                <p className=" font-medium text-end md:mr-15 rounded-md text-orange-400" >Belum DIbayar </p>
                            </div>
                        </div>

                        {contohImageAPI ? (
                            <div className="image-transaction mt-4">
                                <img className=" w-auto md:h-[300px] rounded-md " src={jalanRusak} alt="" />
                            </div>
                        ) : (
                            <>
                                <div className="images mt-3">
                                    {formData.image && formData.image instanceof Blob ? (
                                        <img className="h-[170px] md:h-[300px] w-auto mx-auto rounded-md" src={URL.createObjectURL(formData.image)} />
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
                                        <button className={`border-2 border-primary  text-primary px-4 py-2 rounded-md ${formData.image === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')} >Ubah Gambar</button>
                                    </div>
                                </div>
                                <ButtonPrimary type="submit" className="w-full mt-5 rounded-md"  >Simpan</ButtonPrimary>
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