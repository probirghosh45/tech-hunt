/* eslint-disable react/prop-types */
import { TbFidgetSpinner } from 'react-icons/tb'
import useAuth from '../../hooks/useAuth'
import { TagsInput } from 'react-tag-input-component'
const AddProductForm = ({
  handleSubmit,
  loading = false,
  handleImageChange,
  uploadButtonText,
  tags,
  setTags,
}) => {
  const { user } = useAuth()
  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit} className='w-11/12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='name' className='block text-gray-600'>
                Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='name'
                id='name'
                type='text'
                placeholder='Name'
                required
              />
            </div>
          </div>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='link' className='block text-gray-600'>
                External Link
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='externalLink'
                id='link'
                type='text'
                placeholder='Product Link'
                required
              />
            </div>
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
                    onChange={e => handleImageChange(e.target.files[0])}
                    className='text-sm cursor-pointer w-36 hidden'
                    type='file'
                    name='image'
                    id='image'
                    accept='image/*'
                    hidden
                  />
                  <div className='bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500'>
                    {uploadButtonText}
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
              id='description'
              className='block rounded-md focus:blue-300 w-full h-36 px-4 py-3 text-gray-800  border border-blue-300 focus:outline-blue-500 '
              name='description'
            ></textarea>
          </div>
          <div className='space-y-6'>
            <div>
              <div className='space-y-1 text-sm'>
                <label htmlFor='owner' className='block text-gray-600'>
                  Owner Name
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                  name='owner'
                  id='owner'
                  type='text'
                  value={user?.displayName || ''}
                  placeholder='Product Owner'
                  disabled
                  required
                />
              </div>
            </div>
            <div>
              <div className='space-y-1 text-sm'>
                <label htmlFor='email' className='block text-gray-600'>
                  Owner Email
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                  name='Email'
                  id='Email'
                  type='text'
                  value={user?.email || ''}
                  placeholder='Owner Email'
                  disabled
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500'
        >
          {loading ? (
            <TbFidgetSpinner className='m-auto animate-spin' size={24} />
          ) : (
            'Save & Continue'
          )}
        </button>
      </form>
    </div>
  )
}

export default AddProductForm
