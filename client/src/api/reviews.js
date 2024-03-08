import axiosSecure from '.'

// Fetch all reviews of a product
export const getProductReviews = async productId => {
  const { data } = await axiosSecure(`/reviews/${productId}`)
  return data
}

// Save a review data in db
export const addReview = async reviewData => {
  const { data } = await axiosSecure.post(`/add-review`, reviewData)
  return data
}
