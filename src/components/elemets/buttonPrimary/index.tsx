import React from 'react'

type Props = {
    children?: React.ReactNode
    onClick?: any
    className?: string
    type?: string
    disabled?: boolean
    bg?: string
}

const ButtonPrimary = ({ children, onClick, className, disabled, bg = 'bg-primary' }: Props) => {
    return (
        <button disabled={disabled} className={`${bg} px-4 py-2 text-white  ${className}`} onClick={onClick}  >
            {children}
        </button >
    )
}

export default ButtonPrimary