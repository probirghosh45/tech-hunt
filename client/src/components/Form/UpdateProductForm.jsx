/* eslint-disable react/prop-types */
import { TbFidgetSpinner } from 'react-icons/tb'
import { TagsInput } from 'react-tag-input-component'

const UpdateProductForm = ({
  handleSubmit,
  loading,
  handleImageUpdate,
  productData,
  setProductData,
  tags,
  setTags,
}) => {
  return (
    <div className='w-full  flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-10'>
          <div className='space-y-1 text-sm'>
            <label htmlFor='location' className='block text-gray-600'>
              Name
            </label>
            <input
              className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
              name='name'
              value={productData?.name}
              onChange={event =>
                setProductData({ ...productData, name: event.target.value })
              }
              id='name'
              type='text'
              placeholder='name'
              required
            />
          </div>
          <div className='space-y-1 text-sm'>
            <label htmlFor='link' className='block text-gray-600'>
              External Link
            </label>
            <input
              value={productData?.externalLink}
              onChange={event =>
                setProductData({
                  ...productData,
                  externalLink: event.target.value,
                })
              }
              className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
              name='externalLink'
              id='link'
              type='text'
              placeholder='Product Link'
              required
            />
          </div>

          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='tags' className='block text-gray-600'>
                Tags
              </label>

              <pre>{JSON.stringify(tags)}</pre>
              <TagsInput
                value={tags}
                onChange={setTags}
                name='Tags'
                placeHolder='Enter Tags'
              />
              <em>press enter or comma to add new tag</em>
            </div>
          </div>

          <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
            <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
              <div className='flex flex-col w-max mx-auto text-center'>
                <label>
                  <input
                    onChange={event => {
                      handleImageUpdate(event.target.files[0])
                    }}
                    className='text-sm cursor-pointer w-36 hidden'
                    type='file'
                    name='image'
                    id='image'
                    accept='image/*'
                    hidden
                  />
                  <div className='bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500'>
                    Upload Image
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className='space-y-1 text-sm'>
            <label htmlFor='description' className='block text-gray-600'>
              Description
            </label>

            <textarea
              value={productData?.description}
              onChange={event =>
                setProductData({
                  ...productData,
                  description: event.target.value,
                })
              }
              id='description'
              className='block rounded-md focus:blue-300 w-full h-32 px-4 py-3 text-gray-800  border border-blue-300 focus:outline-blue-500 '
              name='description'
            ></textarea>
          </div>
        </div>

        <button
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500'
        >
          {loading ? (
            <TbFidgetSpinner className='m-auto animate-spin' size={24} />
          ) : (
            'Update'
          )}
        </button>
      </form>
    </div>
  )
}

export default UpdateProductForm
