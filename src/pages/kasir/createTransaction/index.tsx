import { Card, useDisclosure } from "@nextui-org/react"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"
import ModalDefault from "../../../components/fragments/modal/Modal"
import { useState } from "react"
import InputReport from "../../../components/elemets/input/InputReport"



const CreateTransactionKasir = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialPrice = 200000; // Harga awal barang
    const [totalPrice, setTotalPrice] = useState(initialPrice);
    const user_id = localStorage.getItem("user_id");
    const [errorMsg, setErrorMsg] = useState(" ")
    const [form, setForm] = useState({
        status: "Belum Dibayar",
        product: "",
        user: user_id,
        payment_document: null as File | null,
        quantity: 1,
        transaction_type: "online"
    })

    const modalCreateTransaction = () => {
        onOpen();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let newQuantity = form.quantity;

        if (name === 'quantity') {
            newQuantity = Number(value);
        }

        setForm({ ...form, [name]: value });

        if (name === 'quantity') {
            const updatedPrice = initialPrice * newQuantity;
            const priceWithTax = updatedPrice + (updatedPrice * 0.11);
            setTotalPrice(priceWithTax);
        }
    };

    const submitProduct = (e: any) => {
        e.preventDefault();
        if (form.quantity == 0 || form.quantity < 0) {
            setErrorMsg("*Jumlah tidak boleh kosong dan 0")
        } else {
            setErrorMsg("")
        }
    }

    return (
        <DefaultLayout>
            <Card>
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-2">
                    <div className="rounded-lg">
                        <Swiper
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper h-full rounded-lg"
                        >
                            <SwiperSlide >
                                <img
                                    src="https://www.adidas.co.id/media/catalog/product/i/t/it6141_2_apparel_photography_front20center20view_grey.jpg"
                                    className="w-full h-full "
                                    style={{ pointerEvents: 'none' }}
                                />
                            </SwiperSlide>
                            <SwiperSlide >
                                <img
                                    src="https://www.adidas.co.id/media/catalog/product/h/z/hz2106_2_apparel_photography_front20center20view_grey.jpg"
                                    className="w-full h-full "
                                    style={{ pointerEvents: 'none' }}
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className='p-3 lg:p-5' >
                        <h1 className=' text-lg lg:text-xl md:text-3xl font-semibold' >Arsenal Home Jersey</h1>
                        <h2 className='text-md text-gray-500 my-2  font-medium' >Rp.250.000</h2>

                        <h1 className='font-medium my-3 text-base' >AN ARSENAL FAN JERSEY IN THEIR FAMOUS HOME COLOURS, MADE WITH RECYCLED MATERIALS.</h1>
                        <p>A clean look for a young squad who have their sights set on the very top. Standing out over those timeless home colours, a simple embroidered cannon crest is the star of this Arsenal jersey from adidas. Moisture-managing AEROREADY and soft interlock fabric combine to keep football fans comfortable while they enjoy the ride. This product is made with 100% recycled materials. By reusing materials that have already been created, we help to reduce waste and
                            our reliance on finite resources and reduce the footprint of the products we make.</p>

                        <h2 className='text-lg text-gray-500 my-2  ' > <span className='text-red-900 font-medium' >100</span>  Stock tersedia</h2>
                        <div className="flex justify-end mt-2">
                            <ButtonPrimary className="rounded-md" onClick={modalCreateTransaction} >Beli Sekarang</ButtonPrimary>
                        </div>

                    </div>

                    <ModalDefault isOpen={isOpen} onClose={onClose}>
                        <form className="flex p-3 gap-3 justify-center " onSubmit={submitProduct}>
                            <img
                                src="https://www.adidas.co.id/media/catalog/product/h/z/hz2106_2_apparel_photography_front20center20view_grey.jpg"
                                className=" w-[200px] h-[200px] rounded-md"
                                style={{ pointerEvents: 'none' }}
                            />
                            <div className="create">
                                <InputReport marginY="my-0" onChange={handleChange} htmlFor="quantity" title="Jumlah" value={form.quantity} type="number" />
                                <ButtonPrimary type="submit" className="rounded-md mt-3" >Pesan Sekarang</ButtonPrimary>
                            </div>

                        </form>
                        <p className="text-red-500" >{errorMsg}</p>
                        <h1 className=" text-end" >  Total Harga <i className="text-red-500" >sudah termasuk PPN 11% </i>  :   <u>Rp.{totalPrice.toLocaleString()}</u></h1>

                    </ModalDefault>
                </div>
            </Card>
        </DefaultLayout>
    )
}

export default CreateTransactionKasir