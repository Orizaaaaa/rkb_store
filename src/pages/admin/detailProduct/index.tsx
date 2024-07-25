

import DefaultLayout from '../../../components/layout/DefaultLayout'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ButtonPrimary from '../../../components/elemets/buttonPrimary';
import { useDisclosure } from '@nextui-org/react';
import AlertModal from '../../../components/fragments/modal/AlertModal';
import Card from '../../../components/elemets/card/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteProduct, getDetailProduct } from '../../../service/product';
import { formatRupiah } from '../../../utils/helper';
interface Product {
    _id: string;
    title: string;
    description: string;
    images: string[];
    category: string | null;
    stock: number;
    price: number;
    comment: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const DetailProductAdmin = () => {
    const { id }: any = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [dataProduct, setDataProduct] = useState<Product | null>(null);

    //get
    useEffect(() => {
        getDetailProduct(id, (result: any) => {
            setDataProduct(result.data)
        })
    }, []);


    //delete
    const modalDelete = () => {
        onOpen()
    }
    const handleDeleteProduct = async () => {
        deleteProduct(id, (result: any) => {
            if (result) {
                console.log(result);
                navigate('/product-admin')
            }
        })
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

                            {dataProduct?.images.map((image, index) => (
                                <SwiperSlide key={index}>
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
                        <h1 className=' text-lg lg:text-xl md:text-3xl font-semibold' >{dataProduct?.title}</h1>
                        <h2 className='text-md text-gray-500 my-2  font-medium' >{formatRupiah(dataProduct?.price)}</h2>

                        <h1 className='font-medium my-3 text-base' >AN ARSENAL FAN JERSEY IN THEIR FAMOUS HOME COLOURS, MADE WITH RECYCLED MATERIALS.</h1>
                        <p>{dataProduct?.description}</p>

                        <h2 className='text-lg text-gray-500 my-2  ' > <span className='text-red-900 font-medium' >{dataProduct?.stock}</span>  Stock tersedia</h2>
                        <div className="flex justify-end mt-2">
                            <ButtonPrimary onClick={modalDelete} className='bg-red-900 rounded-md' >DELETE PRODUCT</ButtonPrimary>
                        </div>
                    </div>
                    <AlertModal isOpen={isOpen} onClose={onClose} onClick={handleDeleteProduct} >
                        <p>Apakah anda yakin ingin menghapus produk ini ?</p>
                    </AlertModal>
                </div>
            </Card>
        </DefaultLayout>

    )
}

export default DetailProductAdmin