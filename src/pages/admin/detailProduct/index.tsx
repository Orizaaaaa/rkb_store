

import DefaultLayout from '../../../components/layout/DefaultLayout'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ButtonPrimary from '../../../components/elemets/buttonPrimary';
import { useDisclosure } from '@nextui-org/react';
import AlertModal from '../../../components/fragments/modal/AlertModal';
import Card from '../../../components/elemets/card/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteProduct, getDetailProduct, updateProduct } from '../../../service/product';
import { formatRupiah } from '../../../utils/helper';
import ModalDefault from '../../../components/fragments/modal/Modal';
import InputReport from '../../../components/elemets/input/InputReport';
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
    const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();
    const { id }: any = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [dataProduct, setDataProduct] = useState<Product | null>(null);

    // form data untuk update
    const [formData, setFormData] = useState({
        title: '',
        price: 0,
        stock: 0,
        description: ''
    } as any);

    //get
    useEffect(() => {
        getDetailProduct(id, (result: any) => {
            setDataProduct(result.data)
        })
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //delete

    const handleDeleteProduct = async () => {
        deleteProduct(id, (result: any) => {
            if (result) {
                console.log(result);
                navigate('/product-admin')
            }
        })
    }

    const updateModal = () => {
        setFormData({
            title: dataProduct?.title,
            price: dataProduct?.price,
            stock: dataProduct?.stock,
            description: dataProduct?.description
        })
        onUpdateOpen();
    }
    const modalDelete = () => {
        onOpen()
    }


    const handleUpdateProduct = async (e: any) => {
        e.preventDefault();
        const parsedFormData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock)
        };
        await updateProduct(id, parsedFormData, (result: any) => {
            if (result) {
                console.log(result);
                onUpdateClose();
                getDetailProduct(id, (result: any) => {
                    setDataProduct(result.data);
                });
            }
        });
    };






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
                        <p>{dataProduct?.description}</p>

                        <h2 className='text-lg text-gray-500 my-2  ' > <span className='text-red-900 font-medium' >{dataProduct?.stock}</span>  Stock tersedia</h2>
                        <div className="flex gap-2 justify-end mt-2">
                            <ButtonPrimary onClick={updateModal} className=' rounded-md'   >UPDATE PRODUCT</ButtonPrimary>
                            <ButtonPrimary onClick={modalDelete} className='bg-red-900 rounded-md' >DELETE PRODUCT</ButtonPrimary>
                        </div>
                    </div>



                </div>
            </Card>
            <AlertModal isOpen={isOpen} onClose={onClose} onClick={handleDeleteProduct} >
                <p>Apakah anda yakin ingin menghapus produk ini ?</p>
            </AlertModal>

            {/* update */}
            <ModalDefault isOpen={isUpdateOpen} onClose={onUpdateClose} >
                <h1 className="text-lg font-semibold my-4 text-center" >UPDATE PRODUCT</h1>
                <form onSubmit={handleUpdateProduct} >
                    <InputReport marginY="my-0" htmlFor="title" title="Nama Product " type="text" onChange={handleChange} value={formData.title} />

                    <div className="flex gap-3 mt-3">
                        <InputReport marginY="my-0" htmlFor="stock" title="Jumlah Barang " type="number" onChange={handleChange} value={formData.stock} />
                        <InputReport marginY="my-0" htmlFor="price" title="Harga Barang " type="number" onChange={handleChange} value={formData.price} />
                    </div>

                    <label htmlFor="description" className="block mt-4 font-medium ">Deskripsi</label>
                    <textarea onChange={handleChange} value={formData.description} name="description" className="block mt-3 text-black p-2.5 w-full text-sm border border-gray-300 rounded-lg bg-gray-50
                     outline-none" placeholder="Tulis deskripsi ..."></textarea>

                    <ButtonPrimary type="submit" className="w-full mt-5 rounded-md"  >Simpan</ButtonPrimary>
                </form>
            </ModalDefault>
        </DefaultLayout>

    )
}

export default DetailProductAdmin