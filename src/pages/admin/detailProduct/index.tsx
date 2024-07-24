

import DefaultLayout from '../../../components/layout/DefaultLayout'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ButtonPrimary from '../../../components/elemets/buttonPrimary';

const DetailProductAdmin = () => {
    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-2">
                <div className="rounded-lg">
                    <Swiper
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper h-full rounded-lg"
                    >
                        <SwiperSlide >
                            <img
                                src="https://www.adidas.co.id/media/catalog/product/i/t/it6141_2_apparel_photography_front20center20view_grey.jpg"
                                className="w-full h-full "
                                style={{ pointerEvents: 'none' }}
                            />
                        </SwiperSlide>
                        <SwiperSlide >
                            <img
                                src="https://www.adidas.co.id/media/catalog/product/h/z/hz2106_2_apparel_photography_front20center20view_grey.jpg"
                                className="w-full h-full "
                                style={{ pointerEvents: 'none' }}
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

                <div className='p-3 lg:p-5' >
                    <h1 className=' text-lg lg:text-xl md:text-3xl font-semibold' >Arsenal Home Jersey</h1>
                    <h2 className='text-md text-gray-500 my-2  font-medium' >Rp.250.000</h2>

                    <h1 className='font-medium my-3 text-base' >AN ARSENAL FAN JERSEY IN THEIR FAMOUS HOME COLOURS, MADE WITH RECYCLED MATERIALS.</h1>
                    <p>A clean look for a young squad who have their sights set on the very top. Standing out over those timeless home colours, a simple embroidered cannon crest is the star of this Arsenal jersey from adidas. Moisture-managing AEROREADY and soft interlock fabric combine to keep football fans comfortable while they enjoy the ride. This product is made with 100% recycled materials. By reusing materials that have already been created, we help to reduce waste and
                        our reliance on finite resources and reduce the footprint of the products we make.</p>

                    <h2 className='text-lg text-gray-500 my-2  ' > <span className='text-red-900 font-medium' >100</span>  Stock tersedia</h2>
                    <div className="flex justify-end mt-2">
                        <ButtonPrimary className='bg-red-900 rounded-md' >DELETE PRODUCT</ButtonPrimary>
                    </div>

                </div>
            </div>
        </DefaultLayout>

    )
}

export default DetailProductAdmin