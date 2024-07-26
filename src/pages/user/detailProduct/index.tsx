import { Swiper, SwiperSlide } from "swiper/react"
import Card from "../../../components/elemets/card/Card"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"
import { useDisclosure } from "@nextui-org/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import ModalDefault from "../../../components/fragments/modal/Modal"
import { useEffect, useState } from "react"
import InputReport from "../../../components/elemets/input/InputReport"
import { useParams } from "react-router-dom"
import { getDetailProduct } from "../../../service/product"
import { formatRupiah } from "../../../utils/helper"

const DetailProductUser = () => {
    const { id }: any = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [product, setProduct] = useState({} as any);
    const initialPrice = product?.price ? parseFloat(product.price) : 0.0; // Harga awal barang
    const [totalPrice, setTotalPrice] = useState(initialPrice);
    const user_id = localStorage.getItem("user_id");
    const [errorMsg, setErrorMsg] = useState(" ")
    const [form, setForm] = useState({
        status: "Belum Dibayar",
        product: "",
        user: user_id,
        payment_document: null as File | null,
        quantity: 0,
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

    useEffect(() => {
        getDetailProduct(id, (result: any) => {
            setProduct(result.data)
        })
    }, []);




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
                            {product.images?.map((image: any, index: number) => (
                                <SwiperSlide key={index} >
                                    <img
                                        src={image}
                                        className="w-full h-full "
                                        style={{ pointerEvents: 'none' }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className='p-3 lg:p-5' >
                        <h1 className=' text-lg lg:text-xl md:text-3xl font-semibold' >{product.title}</h1>
                        <h2 className='text-md text-gray-500 my-2  font-medium' >{formatRupiah(product.price)}</h2>

                        <p>{product.description}</p>

                        <h2 className='text-lg text-gray-500 my-2  ' > <span className='text-red-900 font-medium' >{product.stock}</span>  Stock tersedia</h2>
                        <div className="flex justify-end mt-2">
                            <ButtonPrimary className="rounded-md" onClick={modalCreateTransaction} >Beli Sekarang</ButtonPrimary>
                        </div>

                    </div>

                    <ModalDefault isOpen={isOpen} onClose={onClose}>
                        <form className="flex p-3 gap-3 justify-center " onSubmit={submitProduct}>
                            <img
                                src={product?.images?.map((image: any) => image)[0]}
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

export default DetailProductUser