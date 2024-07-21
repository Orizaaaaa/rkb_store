
import { formatTitle } from '../../../utils/helper'
import CardLink from '../../elemets/card/CardLink'
import { FaStar } from 'react-icons/fa6'
type Props = {
    location: string
    image: any
    title: string
    price: string
}

const CardProduct = ({ location, image, title, price }: Props) => {
    return (
        <CardLink to={`${location}`}  >
            <div className="images h-[150px] w-full">
                <img className='rounded-lg w-full h-full' src={image} alt="jalan rusak" />
            </div>
            <div className=" mt-1 flex flex-col justify-between h-full">
                <h1 className=' font-semibold text-base'>{formatTitle(title)}</h1>
                <h2 className='text-gray-500' >{price}</h2>
                <div className="flex gap-2 items-center justify-end">
                    <FaStar size={17} color='#FFC107' />
                    <span className='text-gray-500 text-sm' >49 Terjual</span>
                </div>
            </div>
        </CardLink>
    )
}

export default CardProduct