import { Swiper, SwiperSlide } from "swiper/react"
import Card from "../../../components/elemets/card/Card"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"
import { useDisclosure } from "@nextui-org/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import ModalDefault from "../../../components/fragments/modal/Modal"
import { useEffect, useState } from "react"
import InputReport from "../../../components/elemets/input/InputReport"
import { useNavigate, useParams } from "react-router-dom"
import { getDetailProduct } from "../../../service/product"
import { formatRupiah } from "../../../utils/helper"
import { createTransaction } from "../../../service/transaction"

const DetailProductUser = () => {
    const navigate = useNavigate();
    const { id }: any = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [product, setProduct] = useState({} as any);
    const initialPrice = product?.price ? parseFloat(product.price) : 0.0; // Harga awal barang
    const [totalPrice, setTotalPrice] = useState(initialPrice);
    const user_id = localStorage.getItem("user_id");
    const [errorMsg, setErrorMsg] = useState(" ")

    useEffect(() => {
        getDetailProduct(id, (result: any) => {
            setProduct(result.data)
        })
    }, []);

    const [form, setForm] = useState({
        product: product._id,
        user: user_id,
        quantity: '',
        transaction_type: "online"
    } as any);

    const modalCreateTransaction = () => {
        setForm({
            ...form,
            product: product._id
        })
        onOpen();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let newValue: string | number = value;

        if (name === 'quantity') {
            newValue = Number(value);
        }

        setForm({ ...form, [name]: newValue });

        if (name === 'quantity') {
            const newQuantity = Number(value);
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
            createTransaction(form, (result: any) => {
                navigate(`/transaction-user`)
                console.log(result);
            })
            setErrorMsg("")
        }
    }
        ;



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