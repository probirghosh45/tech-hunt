import { useParams } from 'react-router-dom'
import Container from '../../components/Shared/Container'
import { getProduct, updateStatus, updateVote } from '../../api/products'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import Testimonial from '../../components/ProductDetails/Testimonial'
import ReviewSection from '../../components/ProductDetails/ReviewSection'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../components/Shared/Loader'
import { getProductReviews } from '../../api/reviews'
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'

const ProductDetails = () => {
  const { user } = useAuth()
  const { id } = useParams()
  // Fetch Product
  const {
    refetch,
    data: product = {},
    isLoading,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => await getProduct(id),
  })

  // Fetch Reviews
  const {
    refetch: reviewsRefetch,
    data: reviews = [],
    isLoading: reviewsIsLoading,
  } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => await getProductReviews(id),
  })

  const handleUpvote = async (id, status, upvote, downvote, voterId) => {
    console.log({ id, status, upvote, downvote, voterId })
    try {
      await updateVote(id, status, upvote, downvote, voterId)
      toast.success('Successfully UpVoted!')
      refetch()
    } catch (err) {
      console.log(err)
    }
  }
  const handleReport = async (id, status) => {
    try {
      await updateStatus(id, { isReported: status })
      toast.success('Product Reported!')
      refetch()
    } catch (err) {
      toast.error(err.message)
      console.log(err)
    }
  }

  if (isLoading || reviewsIsLoading) return <Loader />
  return (
    <Container>
      <section className='bg-white '>
        <div className='container px-6 py-10 mx-auto'>
          <div className='lg:flex lg:items-center'>
            <div className='w-full space-y-12 lg:w-1/2 '>
              <div>
                <h1 className='text-2xl font-semibold text-gray-800 capitalize lg:text-3xl '>
                  {product?.name} <br />{' '}
                  <span className='text-lg text-gray-600'>
                    by {product?.owner?.name}
                  </span>
                </h1>

                <div className='mt-2'>
                  <span className='inline-block w-40 h-1 bg-blue-500 rounded-full'></span>
                  <span className='inline-block w-3 h-1 ml-1 bg-blue-500 rounded-full'></span>
                  <span className='inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full'></span>
                </div>

                <p className='mt-4 mb-5 text-gray-500 xl:mt-6 '>
                  {product?.description}
                </p>
                <div className='flex gap-3 mb-5'>
                  <a
                    href={product?.externalLink}
                    target='_blank'
                    className='relative block text-lg group disabled:cursor-not-allowed'
                  >
                    <span className='relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white'>
                      <span className='absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50'></span>
                      <span className='absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease'></span>
                      <span className='relative'>Visit Product</span>
                    </span>
                    <span
                      className='absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0'
                      data-rounded='rounded-lg'
                    ></span>
                  </a>
                  <button
                    disabled={!user || product?.upVote.includes(user?.email)}
                    onClick={() =>
                      handleUpvote(
                        product._id,
                        true,
                        product.upVote,
                        product.downVote,
                        user?.email
                      )
                    }
                    className='relative block text-lg group disabled:cursor-not-allowed'
                  >
                    <span className='relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white'>
                      <span className='absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50'></span>
                      <span className='absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease'></span>
                      <span className='relative flex justify-between gap-2'>
                        <AiFillCaretUp className='text-2xl' />
                        {product?.upVote?.length}
                      </span>
                    </span>
                    <span
                      className='absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0'
                      data-rounded='rounded-lg'
                    ></span>
                  </button>
                  <button
                    disabled={!user || product?.downVote.includes(user?.email)}
                    onClick={() =>
                      handleUpvote(
                        product._id,
                        false,
                        product.upVote,
                        product.downVote,
                        user?.email
                      )
                    }
                    className='relative block text-lg group disabled:cursor-not-allowed'
                  >
                    <span className='relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white'>
                      <span className='absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50'></span>
                      <span className='absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease'></span>

                      <span className='relative flex justify-between gap-2'>
                        <AiFillCaretDown className='text-2xl' />
                        {product?.downVote?.length}
                      </span>
                    </span>
                    <span
                      className='absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0'
                      data-rounded='rounded-lg'
                    ></span>
                  </button>
                </div>

                <button
                  disabled={!user || product?.isReported}
                  onClick={() => handleReport(product._id, true)}
                  className='relative disabled:cursor-not-allowed disabled:bg-gray-500 inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group'
                >
                  <span className='absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4'>
                    <span className='absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white'></span>
                  </span>
                  <span className='absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0'></span>
                  <span className='relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white'>
                    {product?.isReported ? 'Already Reported' : 'Report'}
                  </span>
                </button>
              </div>
            </div>

            <div className='hidden lg:flex lg:items-center lg:w-1/2 lg:justify-center'>
              <img
                className='w-[28rem] h-[28rem] object-cover xl:w-[34rem] xl:h-[34rem] rounded-full'
                src={product?.image}
                alt=''
              />
            </div>
          </div>

          <hr className='my-12 border-gray-200 dark:border-gray-700' />
          {/* Testimonial Section */}
          <Testimonial reviews={reviews} />
          {/* Add Review Section */}
          <ReviewSection reviewsRefetch={reviewsRefetch} productId={id} />
        </div>
      </section>
    </Container>
  )
}

export default ProductDetails
