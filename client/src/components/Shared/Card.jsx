import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { updateVote } from '../../api/products'
import toast from 'react-hot-toast'
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'
/* eslint-disable react/prop-types */
const Card = ({ product, refetch }) => {
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
  const { user } = useAuth()
  return (
    <div className='w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg '>
      <img
        className='object-cover object-center w-full h-56'
        src={product?.image}
        alt='avatar'
      />

      <div className='flex items-center px-6 py-3 bg-gray-900'>
        <h1 className='mx-3 text-lg font-semibold text-white'>
          {product?.tags}
        </h1>
      </div>

      <div className='px-6 py-4'>
        <Link to={`/product/${product?._id}`}>
          <h1 className='text-xl font-semibold text-gray-800'>
            {product?.name}
          </h1>
        </Link>

        <div className='flex items-center mt-4 text-gray-700 gap-2'>
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
      </div>
    </div>
  )
}

export default Card
