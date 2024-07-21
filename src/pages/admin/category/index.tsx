import { useEffect, useState } from "react";
import Card from "../../../components/elemets/card/Card"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { FaPlus } from "react-icons/fa";
import { useDisclosure } from "@nextui-org/react";
import InputReport from "../../../components/elemets/input/InputReport";
import { camera } from "../../../image";
import ButtonPrimary from "../../../components/elemets/buttonPrimary";
import { createCategory, getCategories } from "../../../service/category";
import { postImage } from "../../../service/imagePost";
import ModalDefault from "../../../components/fragments/modal/Modal";


const CategoryAdmin = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const [category, setCategory] = useState([]);

    // form data untuk create category
    const [formData, setFormData] = useState({
        name: '',
        image: null as File | null
    });

    //form data untuk delete category
    const [dataDelete, setDataDelete] = useState('')


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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

    //get all category
    useEffect(() => {
        getCategories((result: any) => {
            setCategory(result.data)
        })
    }, []);



    const handlecreateCategory = async (e: any) => {
        e.preventDefault()
        setDataDelete('')
        const imageUrl = await postImage({ image: formData.image });
        if (imageUrl) {
            const data = { name: formData.name, image: imageUrl }
            await createCategory(data, (result: any) => {
                console.log(result);
                onClose()
                getCategories((result: any) => {
                    setCategory(result.data)
                })
                setFormData({
                    name: '',
                    image: null as File | null
                })
            })
        }

    }

    // const handleChangeId = (value: string) => {
    //     setDataDelete(value)
    // }

    const handleAddCategory = () => {
        onOpen();
    }
    // const handleDeleteModal = () => {
    //     onWarningOpen();
    // };

    // const confirmDelete = () => {
    //     if (dataDelete) {
    //         deleteCategory(dataDelete, (result: any) => {
    //             console.log(result);
    //             getCategories((result: any) => {
    //                 setCategory(result.data);
    //             });
    //             setDataDelete('');
    //             onWarningClose();
    //         });
    //     }
    // };



    return (
        <DefaultLayout>
            <Card  >
                <div className="grid ">
                    <div className="flex-col space-y-3 my-auto">
                        <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Halaman Kategori </h1>
                        <p className="text-gray-500 text-sm md:text-base" >Ini adalah halaman kategori anda dapat menambah atau menghapus kategori kaos anda</p>
                    </div>
                </div>
            </Card >

            <div className="listcategory my-4">
                <Card  >
                    <div className='flex flex-wrap justify-center mx-auto mt-5 gap-10 w-full'>
                        <div className="flex flex-col justify-center items-center p-3 rounded-md ">
                            <button onClick={handleAddCategory} className="w-[100px] h-[100px] bg-[#f1faee] rounded-full flex justify-center items-center" ><FaPlus /></button>
                            <p className="text-sm md:text-base font-medium mt-4 text-center" >Tambah Kategori</p>
                        </div>

                        <div className="image flex-col justify-center items-center  p-3 rounded-md " >
                            <div className={`bg-[#f1faee] p-6 ${dataDelete === '2' ? 'border-2 border-primary rounded-md ' : ''}`}>
                                <img className={`w-[100px] h-[100px] mx-auto rounded-md object-cover `}
                                    src={'https://www.adidas.co.id/media/catalog/product/i/t/it6141_2_apparel_photography_front20center20view_grey.jpg'} alt={'image kategori'} />
                            </div>
                            <p className="text-sm md:text-base font-semibold mt-4 text-center">FOOTBAL JERSEY</p>
                            <p className="text-sm md:text-base  text-gray-500  text-center">1000 Product Tersedia</p>
                        </div>

                    </div>
                </Card>

                {/* modal */}
                <ModalDefault isOpen={isOpen} onClose={onClose}>
                    <form onSubmit={handlecreateCategory}>
                        <InputReport htmlFor="name" title="Nama Kategori : " type="text" onChange={handleChange} value={formData.name} />

                        <h1 className=" font-medium" >Logo Kategori :  </h1>
                        <div className="images ">
                            {formData.image && formData.image instanceof Blob ? (
                                <img className="h-[170px] md:h-[300px] w-auto mx-auto rounded-md" src={URL.createObjectURL(formData.image)} />
                            ) : (
                                <div className="images border-dashed border-2 border-black rounded-md h-[200px] bg-gray-300">
                                    <button className="flex-col justify-center items-center h-full w-full " type="button" onClick={() => handleFileManager('add')} >
                                        <img className="w-20 h-20 mx-auto" src={camera} />
                                        <p>*Masukan logo dari kategori tersebut</p>
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
                    </form>
                </ModalDefault>


                {/* Warning Modal */}
                {/* <ModalDefault isOpen={isWarningOpen} onClose={onWarningClose}>
                    <h2 className="text-lg font-semibold">Peringatan</h2>
                    <p> apakah Anda yakin ingin menghapus kategori ini?</p>
                    <div className="flex justify-end gap-4 mt-4">
                        <ButtonPrimary onClick={onWarningClose} className="bg-gray-300 text-black rounded-md">Batal</ButtonPrimary>
                        <ButtonPrimary onClick={confirmDelete} className="bg-red-500 text-white rounded-md">Hapus</ButtonPrimary>
                    </div>
                </ModalDefault> */}
            </div>
        </DefaultLayout>
    )
}

export default CategoryAdmin