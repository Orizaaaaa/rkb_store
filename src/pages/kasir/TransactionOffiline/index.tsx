import { IoSearch } from "react-icons/io5"
import Card from "../../../components/elemets/card/Card"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import CardProduct from "../../../components/fragments/CardProduct/CardProduct"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { formatRupiah } from "../../../utils/helper"
import { getAllProduct } from "../../../service/product"
import { getCategories } from "../../../service/category"


const TransactionOfflineKasir = () => {
    const [searchData, setSearchData] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getAllProduct((result: any) => {
            setProduct(result.data)
        })

        getCategories((result: any) => {
            setCategories(result.data)
        })
    }, []);

    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };

    const filteredData = product.filter((item: any) => {
        return (
            item.title && item.title.toLowerCase().includes(searchData.toLowerCase()) &&
            (selectedCategory === "" || item.category?._id === selectedCategory)
        );
    });

    //value dropdown
    const dataDropdown = categories.map((unit: { name: string, _id: string }) => ({
        label: unit.name,
        value: unit._id,
    }));

    const getItem = (item: any) => {
        setSelectedCategory(item.value)
    }

    return (
        <DefaultLayout>

            <Card className="md:col-span-2 min-h-[83vh]  ">
                <div className="w-full mt-4 relative ">
                    <input onChange={handleSearch} className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="ketik laporan..." name="" id="" />
                    <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="flex justify-end">
                    <Autocomplete
                        label="Filter dengan kategori"
                        className="max-w-xs h-12"
                        clearButtonProps={{ size: 'sm', onClick: () => setSelectedCategory("") }}
                    >
                        {dataDropdown.map((item) => (
                            <AutocompleteItem key={item.value} value={item.value} onClick={() => getItem(item)}>
                                {item.label}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-3">
                    {
                        filteredData.map((item: any, key: any) => (
                            <CardProduct key={key} location={`/transaction-offline-kasir/create-transaction/${item._id}`}
                                title={item.title}
                                price={formatRupiah(item.price)}
                                image={item.images[0]}
                            />
                        ))
                    }
                </div>
            </Card>

        </DefaultLayout>
    )
}

export default TransactionOfflineKasir