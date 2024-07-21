import { useDisclosure } from "@nextui-org/react";
import DefaultLayout from "../../../components/layout/DefaultLayout"
import { useEffect, useState } from "react";
import ButtonPrimary from "../../../components/elemets/buttonPrimary";
import InputReport from "../../../components/elemets/input/InputReport";
import { camera } from "../../../image";
import { FaPlus } from "react-icons/fa6";
import Card from "../../../components/elemets/card/Card";
import { IoCloseCircleOutline } from "react-icons/io5";
import { createUnitWork, deleteUnitWork, getAllUnitWork } from "../../../service/unitWork";
import { postImage } from "../../../service/imagePost";
import ModalDefault from "../../../components/fragments/modal/Modal";


const UnitKerjaAdmin = () => {
    const [unitKerja, setUnitKerja] = useState([]);
    const [errorMsg, setErrorMsg] = useState('')
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const [formData, setFormData] = useState({
        name: '',
        image: null as File | null,
        detail: 'ini adalah sebuah detail'
    });

    //form data untuk delete category
    const [dataDelete, setDataDelete] = useState('')


    //consume get all unit kerja
    useEffect(() => {
        getAllUnitWork((result: any) => {
            const data = result.unitWork
            setUnitKerja(data)
        })
    }, [])

    //nanti nya untuk delete unit kerja
    // const handleButton = (value: string) => {
    //     setDataDelete({ ...dataDelete, _id: value })
    // }


    //create unitWork
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleAddUnitKerja = () => {
        onOpen();
    }

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
    }

    const handleCreateUnitWork = async (e: any) => {
        e.preventDefault()
        const imageUrl = await postImage({ image: formData.image });
        if (imageUrl) {
            const formUnitWork: any = { name: formData.name, image: [imageUrl], detail: formData.detail }
            console.log(formUnitWork);

            createUnitWork(formUnitWork, (status: boolean, res: any) => {
                if (status) {
                    console.log(res);
                    setFormData({
                        name: '',
                        image: null as File | null,
                        detail: 'ini adalah sebuah detail'
                    })

                    getAllUnitWork((result: any) => {
                        const data = result.unitWork
                        setUnitKerja(data)
                    })

                    onClose();
                    setErrorMsg('')

                } else {
                    console.log(res);
                    setErrorMsg('*Tolong isi semua form dengan benar')
                }
            })

        } else {
            setErrorMsg('*Tolong isi semua form dengan benar')
        }

    }


    //delete unitWork
    const handleDeleteUnitWork = async () => {
        await deleteUnitWork(dataDelete, (status: boolean, res: any) => {
            if (status) {
                getAllUnitWork((result: any) => {
                    const data = result.unitWork
                    setUnitKerja(data)
                })

            } else {
                console.log(res);
            }
        })
        onWarningClose();
    }

    const handleChangeId = (value: string) => {
        setDataDelete(value)
    }

    const handleDeleteModal = () => {
        onWarningOpen();
    };

    return (
        <DefaultLayout>
            <Card  >
                <div className="grid ">
                    <div className="flex-col space-y-3 my-auto">
                        <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Halaman Unit Kerja </h1>
                        <p className="text-gray-500 text-sm md:text-base" >Ini adalah halaman Unit Kerja anda dapat menambah atau menghapus Unit Kerja</p>
                    </div>
                </div>
            </Card >

            <div className="listcategory my-4">
                <Card  >
                    <div className='flex flex-wrap justify-center mx-auto mt-5 gap-10 w-full'>
                        <div className="flex flex-col justify-center items-center">
                            <button onClick={handleAddUnitKerja} className="w-[70px] h-[70px] bg-gray-400 rounded-full flex justify-center items-center" ><FaPlus /></button>
                            <p className="mt-1" >Tambah Kategori</p>
                        </div>

                        {unitKerja.map((item: any, index) => (
                            <div className="image flex-col justify-center items-center" key={index}>
                                <img onClick={() => handleChangeId(item._id)}
                                    className={`w-[70px] h-[70px] mx-auto rounded-full object-cover cursor-pointer 

                                    ${dataDelete === item._id ? 'border-2 border-primary' : ''}`}

                                    src={item.image.map((image: any) => image)} alt={item.image.map((image: any) => image)} />

                                <button className={`flex mt-1  ${dataDelete === item._id ? 'block' : 'hidden'}`} onClick={handleDeleteModal} ><IoCloseCircleOutline size={20} color="red" /></button>
                                <p className="text-sm md:text-base mt-1">{item.name}</p>
                            </div>

                        ))}

                    </div>
                </Card>

                {/* modal */}
                <ModalDefault isOpen={isOpen} onClose={onClose}  >
                    <form onSubmit={handleCreateUnitWork}>
                        <InputReport htmlFor="name" title="Nama Unit Kerja : " type="text" onChange={handleChange} value={formData.name} />

                        <h1 className=" font-medium" >Logo Unit Kerja :  </h1>
                        <div className="images ">
                            {formData.image && formData.image instanceof Blob ? (
                                <img className="h-[170px] md:h-[300px] w-auto mx-auto rounded-md" src={URL.createObjectURL(formData.image)} />
                            ) : (
                                <div className="images border-dashed border-2 border-black rounded-md h-[200px] bg-gray-300">
                                    <button className="flex-col justify-center items-center h-full w-full " type="button" onClick={() => handleFileManager('add')} >
                                        <img className="w-20 h-20 mx-auto" src={camera} />
                                        <p>*Masukan logo dari Unit Kerja tersebut</p>
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
                            <p className="mt-3 text-red-600" >{errorMsg}</p>
                        </div>
                        <ButtonPrimary type="submit" className="w-full mt-5 rounded-md"  >Simpan</ButtonPrimary>
                    </form>
                </ModalDefault>

                {/* Warning Modal */}
                <ModalDefault isOpen={isWarningOpen} onClose={onWarningClose}>
                    <h2 className="text-lg font-semibold">Peringatan</h2>
                    <p> apakah Anda yakin ingin menghapus unit kerja ini?</p>
                    <div className="flex justify-end gap-4 mt-4">
                        <ButtonPrimary onClick={onWarningClose} className="bg-gray-300 text-black rounded-md">Batal</ButtonPrimary>
                        <ButtonPrimary onClick={handleDeleteUnitWork} className="bg-red-500 text-white rounded-md">Hapus</ButtonPrimary>
                    </div>
                </ModalDefault>
            </div >

        </DefaultLayout >
    )
}

export default UnitKerjaAdmin