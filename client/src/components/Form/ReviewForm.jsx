/* eslint-disable react/prop-types */

const ReviewForm = ({ handleSubmit, user }) => {
  return (
    <section className='text-gray-600 body-font relative'>
      <div className='container px-5 mx-auto'>
        <div className='lg:w-1/2 md:w-2/3 mx-auto'>
          <form onSubmit={handleSubmit} className='flex flex-wrap -m-2'>
            <div className='p-2 w-1/2'>
              <div className='relative'>
                <label
                  htmlFor='name'
                  className='leading-7 text-sm text-gray-600'
                >
                  Name
                </label>
                <input
                  type='text'
                  value={user?.displayName || ''}
                  disabled
                  id='name'
                  name='name'
                  className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
              </div>
            </div>
            <div className='p-2 w-1/2'>
              <div className='relative'>
                <label
                  htmlFor='email'
                  className='leading-7 text-sm text-gray-600'
                >
                  Email
                </label>
                <input
                  type='email'
                  value={user?.email || ''}
                  disabled
                  id='email'
                  name='email'
                  className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
              </div>
            </div>
            <div className='p-2 w-full'>
              <div className='relative'>
                <label
                  htmlFor='feedback'
                  className='leading-7 text-sm text-gray-600'
                >
                  Feedback
                </label>
                <textarea
                  id='feedback'
                  name='feedback'
                  className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'
                ></textarea>
              </div>
            </div>
            <div className='p-2 w-full'>
              <button
                disabled={!user}
                type='submit'
                className='relative mx-auto block text-lg group disabled:cursor-not-allowed'
              >
                <span className='relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white'>
                  <span className='absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50'></span>
                  <span className='absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease'></span>
                  <span className='relative'>Submit</span>
                </span>
                <span
                  className='absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0'
                  data-rounded='rounded-lg'
                ></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ReviewForm
