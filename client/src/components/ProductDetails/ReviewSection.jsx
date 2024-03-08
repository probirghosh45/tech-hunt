/* eslint-disable react/prop-types */
import toast from 'react-hot-toast'
import { addReview } from '../../api/reviews'
import ReviewForm from '../Form/ReviewForm'
import useAuth from '../../hooks/useAuth'

const ReviewSection = ({ reviewsRefetch, productId }) => {
  const { user } = useAuth()
  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const name = user?.displayName
    const email = user?.email
    const image = user?.photoURL
    const feedback = form.feedback.value
    try {
      await addReview({ name, email, image, feedback, productId })
      toast.success('Review Added!')
      reviewsRefetch()
      form.reset()
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }
  return (
    <div className='container px-6 py-10 mx-auto'>
      <div className='mt-6 md:flex md:items-center md:justify-between  mb-12'>
        <div>
          <h1 className='text-2xl font-semibold text-gray-800 capitalize lg:text-3xl '>
            What you think about this product?
          </h1>

          <div className='flex mx-auto mt-6'>
            <span className='inline-block w-40 h-1 bg-blue-500 rounded-full'></span>
            <span className='inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full'></span>
            <span className='inline-block w-1 h-1 bg-blue-500 rounded-full'></span>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <ReviewForm handleSubmit={handleSubmit} user={user} />
    </div>
  )
}

export default ReviewSection
