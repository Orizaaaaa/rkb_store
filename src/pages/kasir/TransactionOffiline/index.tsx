import { IoSearch } from "react-icons/io5"
import Card from "../../../components/elemets/card/Card"
import DefaultLayout from "../../../components/layout/DefaultLayout"
import CardProduct from "../../../components/fragments/CardProduct/CardProduct"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react"


const TransactionOfflineKasir = () => {
    const animals = [
        { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
        { label: "Dog", value: "dog", description: "The most popular pet in the world" },
        { label: "Elephant", value: "elephant", description: "The largest land animal" },
        { label: "Lion", value: "lion", description: "The king of the jungle" },
        { label: "Tiger", value: "tiger", description: "The largest cat species" },
        { label: "Giraffe", value: "giraffe", description: "The tallest land animal" },
        {
            label: "Dolphin",
            value: "dolphin",
            description: "A widely distributed and diverse group of aquatic mammals",
        },
        { label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds" },
        { label: "Zebra", value: "zebra", description: "A several species of African equids" },
        {
            label: "Shark",
            value: "shark",
            description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
        },
        {
            label: "Whale",
            value: "whale",
            description: "Diverse group of fully aquatic placental marine mammals",
        },
        { label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae" },
        { label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile" },
    ];
    return (
        <DefaultLayout>

            <Card className="md:col-span-2 min-h-[83vh]  ">
                <div className="w-full my-4 relative ">
                    <input className="w-full rounded-md bg-gray-200 outline-none py-2 ps-11" type="text" placeholder="ketik nama product ..." name="" id="" />
                    <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="flex justify-end">
                    <Autocomplete
                        label="Filter dengan kategori"
                        className="max-w-xs h-12"
                    >
                        {animals.map((animal) => (
                            <AutocompleteItem key={animal.value} value={animal.value}>
                                {animal.label}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4  gap-3 my-4">
                    <CardProduct location="/transaction-offline-kasir/create-transaction"
                        title="Jersey Arsenal "
                        price="Rp.250.000"
                        image={'https://www.adidas.co.id/media/catalog/product/i/t/it6141_2_apparel_photography_front20center20view_grey.jpg'}
                    />
                </div>
            </Card>

        </DefaultLayout>
    )
}

export default TransactionOfflineKasir