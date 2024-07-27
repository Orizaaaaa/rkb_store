import { useEffect, useState } from "react";
import { getCategories } from "../../../service/category";



const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories((result: any) => {
      setCategories(result.data)
    })
  }, []);

  return (
    <>
      <div className='py-12 '>
        <div data-aos='fade-zoom-in' data-aos-easing='ease-in-back' data-aos-duration='1000' data-aos-delay='200' data-aos-offset='0'>
          <h1 className='text-center text-2xl md:text-5xl out text-primary-600 font-extrabold mb-8 uppercase'>kategori</h1>
          <div className='flex flex-wrap justify-center mx-auto mt-5 gap-10 w-full'>

            {categories.map((item: any, index: any) => (
              <div className="image flex-col justify-center items-center  p-3 rounded-md  " key={index}>
                <div className="bg-[#f1faee] p-6">
                  <img className={`w-[100px] h-[100px] mx-auto rounded-md object-cover `}
                    src={item.image} alt={'image kategori'} />
                </div>
                <p className="text-sm md:text-base font-semibold mt-4 text-center">{item.name}</p>
              </div>
            ))}

          </div>
        </div>
      </div>

    </>
  );
};

export default Categories;
