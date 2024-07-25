import { useState } from "react"
import Card from "../../../components/elemets/card/Card"
import InputReport from "../../../components/elemets/input/InputReport"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { camera } from "../../../image"
import CaraoselImage from "../../../components/fragments/caraoselImage/CaraoselImage"
import { SwiperSlide } from "swiper/react"
import { IoCloseCircleOutline } from "react-icons/io5"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"
import { postImagesArray } from "../../../service/imagePost"

const AddProductAdmin = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        stock: 0,
        images: [] as File[],
    });

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


    const handleAddProduct = () => {
        //image handle
        postImagesArray({ images: formData.images }).then((urls) => {
            console.log(urls);
        })
    }


    return (
        <DefaultLayout>
            <Card  >
                <InputReport onChange={handleChange} htmlFor="title" title="Nama Product" value={formData.title} type="text" />

                <div className="grid w-full grid-cols-2 gap-3">
                    <InputReport onChange={handleChange} marginY="my-0" htmlFor="price" title="Harga" value={formData.price} type="number" />
                    <InputReport onChange={handleChange} marginY="my-0" htmlFor="stock" title="Stock" value={formData.stock} type="number" />
                </div>

                <label htmlFor="description" className="block mt-4 font-medium ">Deskripsi</label>
                <textarea name="description" onChange={handleChange} value={formData.description} className="block mt-2 text-black p-2.5 w-full text-sm border border-gray-300 rounded-lg bg-gray-50
                     outline-none" placeholder="Tulis deskripsi..."></textarea>

                <div className="grid grid-cols-2 gap-3 items-center">
                    <div className="images border-dashed border-2 mt-7 border-black rounded-md h-[200px] bg-gray-300 relative">
                        <button className="flex flex-col justify-center items-center h-full w-full relative" type="button">
                            <img className="w-20 h-20 mx-auto" src={camera} alt="camera" />
                            <p>*Masukan logo dari kategori tersebut</p>
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

                </div>
                <div className="flex justify-end">
                    <ButtonPrimary className="mt-5 rounded-md" onClick={handleAddProduct} >Buat Product</ButtonPrimary>
                </div>


            </Card>
        </DefaultLayout>
    )
}

export default AddProductAdmin