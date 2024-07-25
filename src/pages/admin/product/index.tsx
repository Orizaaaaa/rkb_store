import DefaultLayout from "../../../components/layout/DefaultLayout"
import { IoSearch } from "react-icons/io5"
import { useEffect, useState } from "react"
import { getAllProduct } from "../../../service/product"
import { useDisclosure } from "@nextui-org/react"
import CardLoading from "../../../components/fragments/CardLoading/CardLoading"
import CardProduct from "../../../components/fragments/CardProduct/CardProduct"
import ModalDefault from "../../../components/fragments/modal/Modal"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"
import InputReport from "../../../components/elemets/input/InputReport"
import { formatRupiah } from "../../../utils/helper"
import { Link } from "react-router-dom"


const ProductAdmin = () => {
    const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();
    const [loading, setLoading] = useState(true)
    const [dataProduct, setDataProduct] = useState([]);
    const [searchData, setSearchData] = useState("");

    //form data untuk delete category

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



    useEffect(() => {
        getAllProduct((result: any) => {
            setDataProduct(result.data)
            setLoading(false)
        })
    }, []);


    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };


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
                <Link to='/product-admin/add-product' className="bg-primary border-none text-white px-4 py-2 rounded-md " >
                    Tambah Product
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-3">
                {loading ? (
                    <CardLoading />
                ) : (
                    dataProduct.map((item: any, key: any) => (
                        <CardProduct key={key} location={`/product-admin/detail-product-admin/${item._id}`}
                            title={item.title}
                            price={formatRupiah(item.price)}
                            image={item.images[0]}
                            onClick={updateModal}
                        />
                    ))
                )}
            </div>

            {/* update */}
            <ModalDefault isOpen={isUpdateOpen} onClose={onUpdateClose} >
                <form >
                    <InputReport marginY="my-0" htmlFor="name" title="Nama Product " type="text" onChange={handleChange} value={formData.name} />

                    <div className="flex gap-3">
                        <InputReport marginY="my-0" htmlFor="stock" title="Jumlah Barang " type="number" onChange={handleChange} value={formData.stock} />
                        <InputReport marginY="my-0" htmlFor="price" title="Harga Barang " type="number" onChange={handleChange} value={formData.price} />
                    </div>

                    <label htmlFor="message" className="block mt-4 font-medium ">Deskripsi</label>
                    <textarea id="message" className="block mt-3 text-black p-2.5 w-full text-sm border border-gray-300 rounded-lg bg-gray-50
                     outline-none" placeholder="Tulis deskripsi ..."></textarea>

                    <ButtonPrimary type="submit" className="w-full mt-5 rounded-md"  >Simpan</ButtonPrimary>


                </form>
            </ModalDefault>


        </DefaultLayout >
    )
}

export default ProductAdmin