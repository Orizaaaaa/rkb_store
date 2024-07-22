import DefaultLayout from "../../../components/layout/DefaultLayout"
import { IoSearch } from "react-icons/io5"
import { useEffect, useState } from "react"
import { getAllReport } from "../../../service/report"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"
import CardLoading from "../../../components/fragments/CardLoading/CardLoading"
import CardProduct from "../../../components/fragments/CardProduct/CardProduct"
import ModalDefault from "../../../components/fragments/modal/Modal"
import InputReport from "../../../components/elemets/input/InputReport"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"
import { camera } from "../../../image"


const ProductAdmin = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();
    const [loading, setLoading] = useState(false)
    const [dataReport, setDataReport] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [searchData, setSearchData] = useState("");

    //form data untuk delete category
    const [dataDelete, setDataDelete] = useState('')
    const dispatch = useDispatch();
    const report = useSelector((state: any) => state.report.reportList);

    // form data untuk create category
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        image: null as File | null
    });




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


    // useEffect(() => {
    //     if (report.length < 1) {
    //         setLoading(true)
    //         getAllReport((result: any) => {
    //             dispatch(addReport(result.data));
    //             setDataReport(result.data);
    //             setLoading(false)
    //         });
    //     } else {
    //         setDataReport(report);
    //         setLoading(false)
    //     }
    // }, []);


    const handleStatusSelect = (status: any) => {
        setSelectedStatus(status);
    };

    useEffect(() => {
        getAllReport((result: any) => {
            setDataReport(result.data)
        })
    }, []);

    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };

    const filteredData = dataReport.filter((item: any) => {
        return (
            item.title && item.title.toLowerCase().includes(searchData.toLowerCase()) &&
            (selectedStatus === "" || item.status === selectedStatus)
        );
    });

    const addProductModal = () => {
        onOpen();
    }

    const updateModal = () => {
        onUpdateOpen();
    }


    return (
        <DefaultLayout>
            <div className="w-full mt-4 relative ">
                <input onChange={handleSearch} className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="ketik laporan..." name="" id="" />
                <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex mt-4 gap-3">
                <button onClick={addProductModal} className="bg-primary border-none text-white px-4 py-2 rounded-md " >
                    Tambah Product
                </button>

                {/* dropdown status */}
                <Dropdown>
                    <DropdownTrigger>
                        <Button className=" bg-white text-primary text-md font-medium rounded-md"
                        >
                            Category
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="Semua Status" onClick={() => handleStatusSelect("")}>Semua Status</DropdownItem>
                        <DropdownItem key="Menunggu" onClick={() => handleStatusSelect("Menunggu")}> Menunggu</DropdownItem>
                        <DropdownItem onClick={() => handleStatusSelect("Diproses")} key="Diproses">Di Proses</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-3">
                {loading ? (
                    <CardLoading />
                ) : (

                    <CardProduct location="/laporan-admin/submit-laporan-admin/"
                        title="Jersey Arsenal "
                        price="Rp.250.000"
                        image={'https://www.adidas.co.id/media/catalog/product/i/t/it6141_2_apparel_photography_front20center20view_grey.jpg'}
                        onClick={updateModal}
                    />

                )}
            </div>

            {/* create */}
            <ModalDefault isOpen={isOpen} onClose={onClose} >
                <form >
                    <InputReport htmlFor="name" title="Nama Product " type="text" onChange={handleChange} value={formData.name} />

                    <div className="flex gap-2">
                        <InputReport marginY="my-0" htmlFor="stock" title="Jumlah Barang " type="number" onChange={handleChange} value={formData.stock} />
                        <InputReport marginY="my-0" htmlFor="price" title="Harga Barang " type="number" onChange={handleChange} value={formData.price} />
                    </div>

                    <label htmlFor="message" className="block mt-4 font-medium ">Deskripsi</label>
                    <textarea id="message" className="block mt-3 text-black p-2.5 w-full text-sm border border-gray-300 rounded-lg bg-gray-50
                     outline-none" placeholder="Write your thoughts here..."></textarea>

                    <h1 className=" font-medium mt-5" >Foto Product   </h1>
                    <div className="images ">
                        {formData.image && formData.image instanceof Blob ? (
                            <img className="h-[170px] md:h-[300px] w-auto mx-auto rounded-md" src={URL.createObjectURL(formData.image)} />
                        ) : (
                            <div className="images border-dashed border-2 border-black rounded-md h-[200px] bg-gray-300">
                                <button className="flex-col justify-center items-center h-full w-full " type="button" onClick={() => handleFileManager('add')} >
                                    <img className="w-20 h-20 mx-auto" src={camera} />
                                    <p>*Masukan foto product anda minimal 1</p>
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

            {/* update */}
            <ModalDefault isOpen={isUpdateOpen} onClose={onUpdateClose} >
                <form >
                    <InputReport htmlFor="name" title="Nama Product " type="text" onChange={handleChange} value={formData.name} />

                    <div className="flex gap-3">
                        <InputReport marginY="my-0" htmlFor="stock" title="Jumlah Barang " type="number" onChange={handleChange} value={formData.stock} />
                        <InputReport marginY="my-0" htmlFor="price" title="Harga Barang " type="number" onChange={handleChange} value={formData.price} />
                    </div>

                    <ButtonPrimary type="submit" className="w-full mt-5 rounded-md"  >Simpan</ButtonPrimary>


                </form>
            </ModalDefault>


        </DefaultLayout>
    )
}

export default ProductAdmin