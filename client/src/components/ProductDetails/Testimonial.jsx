/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import { useCallback, useState } from 'react'
const Testimonial = ({ reviews }) => {
  const [swiperRef, setSwiperRef] = useState()
  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev()
  }, [swiperRef])

  const handleNext = useCallback(() => {
    swiperRef?.slideNext()
  }, [swiperRef])

  return (
    <div className='container px-6 py-10 mx-auto'>
      <div className='mt-6 md:flex md:items-center md:justify-between  mb-12'>
        <div>
          <h1 className='text-2xl font-semibold text-gray-800 capitalize lg:text-3xl '>
            What users are saying about this product..
          </h1>

          <div className='flex mx-auto mt-6'>
            <span className='inline-block w-40 h-1 bg-blue-500 rounded-full'></span>
            <span className='inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full'></span>
            <span className='inline-block w-1 h-1 bg-blue-500 rounded-full'></span>
          </div>
        </div>

        <div className='flex justify-between mt-8 md:mt-0'>
          <button
            title='left arrow'
            onClick={handlePrevious}
            className='p-2 mx-3 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100  hover:bg-gray-100'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <button
            title='right arrow'
            onClick={handleNext}
            className='p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100  hover:bg-gray-100'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        onSwiper={setSwiperRef}
        slidesPerView={screen.availWidth > 800 ? 3 : 1}
      >
        {reviews.map(review => (
          <SwiperSlide key={review._id}>
            <div className='p-8 border rounded-lg '>
              <p className='leading-loose text-gray-500 '>
                {review?.feedback.substring(0, 100)}...
              </p>

              <div className='flex items-center mt-8 -mx-2'>
                <img
                  className='object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 '
                  src={review?.image}
                  alt=''
                />

                <div className='mx-2'>
                  <h1 className='font-semibold text-gray-800 '>
                    {review?.name}
                  </h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Testimonial
