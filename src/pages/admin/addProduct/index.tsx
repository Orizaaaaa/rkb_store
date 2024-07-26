import { useEffect, useState } from "react"
import Card from "../../../components/elemets/card/Card"
import InputReport from "../../../components/elemets/input/InputReport"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { camera } from "../../../image"
import CaraoselImage from "../../../components/fragments/caraoselImage/CaraoselImage"
import { SwiperSlide } from "swiper/react"
import { IoCloseCircleOutline } from "react-icons/io5"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"
import { postImagesArray } from "../../../service/imagePost"
import { createProduct } from "../../../service/product"
import { getCategories } from "../../../service/category"
import { Autocomplete, AutocompleteItem, Spinner } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const AddProductAdmin = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        images: [] as File[],
    });

    useEffect(() => {
        getCategories((result: any) => {
            setCategories(result.data);
        })
    }, []);

    //image handle
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, InputSelect: string) => {
        if (InputSelect === 'add') {
            const selectedImage = e.target.files?.[0];
            if (selectedImage) {
                setFormData(prevState => ({
                    ...prevState,
                    images: [...prevState.images, selectedImage]
                }));
            }
        } else {
            console.log('error');
        }
    };

    const deleteArrayImage = (index: number) => {
        setFormData(prevState => ({
            ...prevState,
            images: prevState.images.filter((_, i) => i !== index)
        }));
    };


    const handleAddProduct = async () => {
        setLoading(true);
        if (!formData.title || !formData.description || !formData.price || !formData.stock || !formData.category || formData.images.length === 0) {
            setErrorMessage(true);
            setLoading(false);
        } else {
            try {
                // Handle image upload
                const urls: string[] = await postImagesArray({ images: formData.images });
                const parsedFormData = {
                    ...formData,
                    images: urls, // Assigning the array of image URLs directly
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock),
                };

                createProduct(parsedFormData, (result: any) => {
                    if (result) {
                        console.log(result);
                        navigate('/product-admin');
                        setFormData({
                            title: '',
                            description: '',
                            price: '',
                            stock: '',
                            category: '',
                            images: [] as File[],
                        });
                        setLoading(false);
                    }
                });
                setErrorMessage(false);
            } catch (error) {
                console.error('Error adding product:', error);
            }
        }
    };

    //value dropdown
    const dataDropdown = categories.map((unit: { name: string, _id: string }) => ({
        label: unit.name,
        value: unit._id,
    }));
    const getItem = (item: any) => {
        setFormData({ ...formData, category: item.value })
    }

    return (
        <DefaultLayout>
            <Card  >
                <InputReport onChange={handleChange} htmlFor="title" title="Nama Product" value={formData.title} type="text" />

                <div className="grid w-full grid-cols-2 gap-3">
                    <InputReport onChange={handleChange} marginY="my-0" htmlFor="price" title="Harga" value={formData.price} type="number" />
                    <InputReport onChange={handleChange} marginY="my-0" htmlFor="stock" title="Stock" value={formData.stock} type="number" />
                </div>

                {/* unit kerja dropdown */}
                <div className={`flex w-full flex-wrap md:flex-nowrap mt-5`}>
                    <Autocomplete
                        label="Pilih Kategori"
                        clearButtonProps={{ size: 'sm', onClick: () => setFormData({ ...formData, category: '' }) }}
                    >
                        {dataDropdown.map((item) => (
                            <AutocompleteItem key={item.value} value={item.value} onClick={() => getItem(item)}   >
                                {item.label}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>

                <label htmlFor="description" className="block mt-4 font-medium ">Deskripsi</label>
                <textarea name="description" onChange={handleChange} value={formData.description} className="block mt-2 text-black p-2.5 w-full text-sm border border-gray-300 rounded-lg bg-gray-50
                     outline-none" placeholder="Tulis deskripsi..."></textarea>

                <div className="grid grid-cols-2 gap-3 items-center">
                    <div className="images border-dashed border-2 mt-7 border-black rounded-md h-[200px] bg-gray-300 relative">
                        <button className="flex flex-col justify-center items-center h-full w-full relative" type="button">
                            <img className="w-20 h-20 mx-auto" src={camera} alt="camera" />
                            <p>*Masukan logo dari product tersebut</p>
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                id="image-input-add"
                                onChange={(e) => handleImageChange(e, 'add')}
                            />
                        </button>

                    </div>
                    <div className="caraosel">
                        <CaraoselImage>
                            {formData.images.length > 0 && (
                                formData.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <>
                                            <div className="flex justify-center items-center" style={{ pointerEvents: 'none' }}>
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`preview-${index}`}
                                                    className="w-auto h-[200px] relative"
                                                />
                                            </div>
                                            <button onClick={() => deleteArrayImage(index)} className="button-delete array image absolute top-0 right-0 z-10 "  ><IoCloseCircleOutline color="red" size={34} /></button>
                                        </>
                                    </SwiperSlide>
                                ))
                            )}
                        </CaraoselImage>
                    </div>
                    <p className="text-red-500" >{errorMessage ? '*error, tolong isi lengkap form dengan benar' : ''}</p>
                </div>
                <div className="flex justify-end">
                    <ButtonPrimary className="mt-5 min-w-32 rounded-md" onClick={handleAddProduct} >
                        {loading ? <Spinner className={`w-5 h-5 `} size="sm" color="white" /> : 'Buat Product'}
                    </ButtonPrimary>
                </div>


            </Card>
        </DefaultLayout>
    )
}

export default AddProductAdmin