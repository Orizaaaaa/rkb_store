import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    title?: string,
    to: string,
    children: React.ReactNode
}

const CardLink = ({ children, to }: Props) => {
    return (
        <Link to={to} className="rounded-md hover: border-stroke transform transition-transform 
        duration-300 hover:scale-105 bg-white p-3 lg:px-3 lg:py-3 shadow-default 
        dark:border-strokedark h-full grid">
            {children}
        </Link>
    )
}

export default CardLink