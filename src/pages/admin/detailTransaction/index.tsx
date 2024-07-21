import Card from "../../../components/elemets/card/Card"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { jalanRusak } from "../../../image"

const DetailTransaction = () => {
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
                    </div>

                    <div className="right">
                        <div className="text">
                            <div className="status">
                                <p className=" font-medium text-end md:mr-15 rounded-md text-green-500" >Selesai </p>
                            </div>
                        </div>

                        <div className="image-transaction mt-4">
                            <img className=" w-auto md:h-[300px] rounded-md " src={jalanRusak} alt="" />
                        </div>
                    </div>
                </div>

            </Card>

        </DefaultLayout>
    )
}

export default DetailTransaction