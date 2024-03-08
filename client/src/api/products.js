import axiosSecure from '.'

// Fetch all products from db
export const getAllProducts = async () => {
  const { data } = await axiosSecure('/products')
  return data
}
// Fetch all products for users
export const getUserProducts = async email => {
  const { data } = await axiosSecure(`/products/${email}`)
  return data
}
// Fetch single product data from db
export const getProduct = async id => {
  const { data } = await axiosSecure(`/product/${id}`)
  return data
}
// Save a product data in db
export const addProduct = async productData => {
  const { data } = await axiosSecure.post(`/add-product`, productData)
  return data
}
// Delete a product
export const deleteProduct = async id => {
  const { data } = await axiosSecure.delete(`/product/${id}`)
  return data
}
// update a product
export const updateProduct = async (productData, id) => {
  const { data } = await axiosSecure.put(`/product/${id}`, productData)
  return data
}

// update product status
export const updateStatus = async (id, status) => {
  const { data } = await axiosSecure.patch(`/product/status/${id}`, status)
  return data
}

// increase upvote
export const updateVote = async (id, status, upvote, downvote, voterId) => {
  const { data } = await axiosSecure.patch(`/product/vote/${id}`, {
    status,
    upvote,
    downvote,
    voterId,
  })
  return data
}
