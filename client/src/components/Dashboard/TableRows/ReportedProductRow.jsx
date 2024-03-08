/* eslint-disable react/prop-types */
import { useState } from 'react'
import toast from 'react-hot-toast'
import DeleteModal from '../../Modal/DeleteModal'
import { deleteProduct } from '../../../api/products'
import { Link } from 'react-router-dom'

const ReportedProductRow = ({ product, refetch }) => {
  let [isOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  const modalHandler = id => {
    deleteProduct(id)
      .then(data => {
        console.log(data)
        refetch()
        toast.success('Product deleted!')
      })
      .catch(err => console.log(err))
    closeModal()
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
          {product?.upVote.length}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {product?.downVote.length}
        </p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='space-x-1'>
          <button
            onClick={openModal}
            className='bg-red-200 text-red-900 px-2 py-1 rounded-lg w-28 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-500'
          >
            Delete
          </button>
          <button className='bg-blue-200 text-blue-900 px-2 py-1 rounded-lg w-28'>
            <Link to={`/product/${product?._id}`}> View Product</Link>
          </button>
        </div>

        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalHandler={modalHandler}
          id={product._id}
        />
      </td>
    </tr>
  )
}

export default ReportedProductRow
