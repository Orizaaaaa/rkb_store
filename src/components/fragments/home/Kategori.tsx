


const Categories = () => {


  return (
    <>
      <div className='py-12 '>
        <div data-aos='fade-zoom-in' data-aos-easing='ease-in-back' data-aos-duration='1000' data-aos-delay='200' data-aos-offset='0'>
          <h1 className='text-center text-2xl md:text-5xl out text-primary-600 font-extrabold mb-8 uppercase'>kategori</h1>
          <div className='flex flex-wrap justify-center mx-auto mt-5 gap-10 w-full'>
            <div className="image flex-col justify-center items-center  p-3 rounded-md  " >
              <div className="bg-[#f1faee] p-6">
                <img className={`w-[100px] h-[100px] mx-auto rounded-md object-cover `}
                  src={'https://www.adidas.co.id/media/catalog/product/i/t/it6141_2_apparel_photography_front20center20view_grey.jpg'} alt={'image kategori'} />
              </div>
              <p className="text-sm md:text-base font-semibold mt-4 text-center">FOOTBAL JERSEY</p>
              <p className="text-sm md:text-base  text-gray-500  text-center">1000 Product Tersedia</p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Categories;
