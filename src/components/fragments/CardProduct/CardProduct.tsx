
import { BsThreeDots } from 'react-icons/bs'
import { formatTitle } from '../../../utils/helper'
import { FaStar } from 'react-icons/fa6'
import Card from '../../elemets/card/Card'
import { Link } from 'react-router-dom'
type Props = {
    location: string
    image: any
    title: string
    price: string
    onClick?: any
}

const CardProduct = ({ location, image, title, price, onClick }: Props) => {
    return (
        <Card padding='p-3' >
            <div className="images h-[150px] w-full">
                <Link to={`${location}`}>
                    <img className='rounded-lg w-full h-full' src={image} alt="image" />
                </Link>

            </div>
            <div className=" mt-1 flex flex-col justify-between h-full">
                <h1 className=' font-semibold text-base'>{formatTitle(title)}</h1>
                <h2 className='text-gray-500' >{price}</h2>
                <div className="flex gap-2 items-center justify-end">
                    <FaStar size={17} color='#FFC107' />
                    <span className='text-gray-500 text-sm' >49 Terjual</span>
                    {onClick ? <button onClick={onClick} ><BsThreeDots size={20} /></button> : null}
                </div>
            </div>
        </Card >
    )
}

export default CardProduct