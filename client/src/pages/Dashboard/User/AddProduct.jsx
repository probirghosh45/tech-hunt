import { Helmet } from 'react-helmet-async'
import AddProductForm from '../../../components/Form/AddProductForm'
import { useState } from 'react'
import { imageUpload } from '../../../api/utils'
import useAuth from '../../../hooks/useAuth'
import { addProduct } from '../../../api/products'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const AddProduct = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
  const [tags, setTags] = useState([])
  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const description = form.description.value
    const image = form.image.files[0]
    const owner = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }
    const externalLink = form.externalLink.value
    const image_url = await imageUpload(image)

    const productData = {
      name,
      owner,
      description,
      image: image_url?.data?.display_url,
      externalLink,
      tags,
      upVote: [],
      downVote: [],
      isFeatured: false,
      isReported: false,
      isApproved: 'Pending',
    }

    try {
      const data = await addProduct(productData)
      console.log(data)
      setUploadButtonText('Uploaded!')
      toast.success('Product Added!')
      navigate('/dashboard/my-products')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }

    console.table(productData)
  }

  // Handle Image button text
  const handleImageChange = image => {
    setUploadButtonText(image.name)
  }

  return (
    <div>
      <Helmet>
        <title>Add Products | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddProductForm
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        loading={loading}
        uploadButtonText={uploadButtonText}
        tags={tags}
        setTags={setTags}
      />
    </div>
  )
}

export default AddProduct
