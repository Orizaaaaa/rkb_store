
type Props = {
    title?: string,
    padding?: string,
    children: React.ReactNode
}
const Card = ({ children, padding = 'p-4 lg:px-7.5 lg:py-6', }: Props) => {
    return (
        <div className={`rounded-md  bg-white ${padding}  shadow-default dark:border-strokedark `}>
            <div className=" rounded-full ">
                {children}
            </div>
        </div>
    )
}

export default Card