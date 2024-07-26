import DefaultLayout from "../../../components/layout/DefaultLayout"
import { IoSearch } from "react-icons/io5"
import { useEffect, useState } from "react"
import { getAllProduct } from "../../../service/product"
import CardLoading from "../../../components/fragments/CardLoading/CardLoading"
import CardProduct from "../../../components/fragments/CardProduct/CardProduct"
import { formatRupiah } from "../../../utils/helper"
import { Link } from "react-router-dom"


const ProductAdmin = () => {
    const [loading, setLoading] = useState(true)
    const [dataProduct, setDataProduct] = useState([]);
    const [searchData, setSearchData] = useState("");

    //form data untuk delete category




    useEffect(() => {
        getAllProduct((result: any) => {
            setDataProduct(result.data)
            setLoading(false)
        })
    }, []);


    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };




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
                        />
                    ))
                )}
            </div>


        </DefaultLayout >
    )
}

export default ProductAdmin