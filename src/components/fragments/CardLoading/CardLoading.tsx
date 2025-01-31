
import Card from '../../elemets/card/Card';


const CardLoading = () => {
    const renderCards = () => {
        return Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
                <div role="status" className="animate-pulse">
                    <svg className="w-full my-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                    <div className="w-full">
                        <div className="h-5 bg-gray-300 rounded-md w-48 mb-1"></div>
                        <div className="h-2 bg-gray-300 rounded-md max-w-[100px] mb-1"></div>
                        <div className="h-2 bg-gray-300 rounded-md max-w-[120px] mb-1"></div>
                        <div className="h-2 bg-gray-300 rounded-md max-w-[160px] mb-1"></div>
                        <div className="h-4 bg-gray-300 rounded-sm w-full mb-1"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            </Card>
        ));
    };

    return (
        <>
            {renderCards()}
        </>
    );
};

export default CardLoading;
