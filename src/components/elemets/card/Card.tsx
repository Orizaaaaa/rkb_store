

const Card = ({ children }: any) => {
    return (
        <div className="rounded-md  bg-white p-4 lg:px-7.5 lg:py-6 shadow-default dark:border-strokedark ">
            <div className=" rounded-full ">
                {children}
            </div>
        </div>
    )
}

export default Card