/* eslint-disable react/prop-types */
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { updateStatus } from '../../../api/products'

const ProductQueueRow = ({ product, refetch }) => {
  const approveHandler = async (id, flag) => {
    if (flag) {
      try {
        await updateStatus(id, { isApproved: 'Approved' })
        toast.success('Product approved')
        refetch()
      } catch (err) {
        toast.error(err.message)
        console.log(err)
      }
    } else {
      console.log('Product Rejected')
      console.log(id)
      try {
        await updateStatus(id, { isApproved: 'Rejected' })
        toast.success('Product Rejected')
        refetch()
      } catch (err) {
        toast.error(err.message)
        console.log(err)
      }
    }
  }
  const featuredHandler = async (id, flag) => {
    try {
      await updateStatus(id, { isFeatured: flag })
      toast.success(
        flag ? 'Product is featured now' : 'Featured Status Reverted'
      )
      refetch()
    } catch (err) {
      toast.error(err.message)
      console.log(err)
    }
  }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={product?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{product?.name}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {product?.isFeatured ? 'True' : 'False'}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {product?.isApproved}
        </p>
      </td>

      <td className='px-5 space-y-1 py-5 border-b border-gray-200 bg-white text-sm '>
        <div className='space-x-1'>
          <button
            onClick={() => approveHandler(product._id, true)}
            className='bg-green-200 text-green-900 px-2 py-1 rounded-lg w-28 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500'
            disabled={product?.isApproved === 'Approved'}
          >
            Approve
          </button>
          <button
            onClick={() => approveHandler(product._id, false)}
            className='bg-red-200 text-red-900 px-2 py-1 rounded-lg w-28 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500'
            disabled={product?.isApproved === 'Rejected'}
          >
            Reject
          </button>
        </div>
        <div className='space-x-1'>
          <button
            onClick={() => featuredHandler(product._id, !product?.isFeatured)}
            className='bg-green-200 text-green-900 px-2 py-1 rounded-lg w-28 disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-200'
          >
            {product?.isFeatured ? 'Revert' : 'Make Featured'}
          </button>
          <button className='bg-blue-200 text-blue-900 px-2 py-1 rounded-lg w-28'>
            <Link to={`/product/${product?._id}`}> View Product</Link>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ProductQueueRow
