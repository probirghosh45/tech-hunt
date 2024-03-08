import { useQuery } from '@tanstack/react-query'
import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Card from '../../components/Shared/Card'
import { getAllProducts } from '../../api/products'
import Loader from '../../components/Shared/Loader'
import { useEffect, useState } from 'react'

const AllProducts = () => {
  const [searchValue, setSearchValue] = useState('')
  const [allProducts, setAllProducts] = useState([])
  const {
    refetch,
    data: products = [],
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await getAllProducts(),
  })

  useEffect(() => {
    setAllProducts(products.filter(p => p.isApproved === 'Approved'))
  }, [products])
  console.log(products)
  console.log(allProducts)

  const handleSearch = (e, value) => {
    e.preventDefault()
    if (value) {
      setAllProducts(
        products.filter(
          p => p?.isApproved === 'Approved' && p?.tags.includes(value)
        )
      )
    } else {
      setAllProducts(products.filter(p => p.isApproved === 'Approved'))
    }
  }

  if (isLoading) return <Loader />
  return (
    <Container>
      <div className='flex flex-col justify-center items-center max-w-2xl mx-auto md:px-8 pt-16 '>
        {/* form Section */}
        <form className='flex flex-col items-center w-full mb-4 md:flex-row'>
          <input
            placeholder='Search by tags'
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            required=''
            type='text'
            className='flex-grow w-full h-14 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-blue-400 focus:outline-none '
          />

          <button
            onClick={e => handleSearch(e, searchValue)}
            type='submit'
            className='relative  inline-flex items-center justify-center text-lg group disabled:cursor-not-allowed'
          >
            <span className='relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white'>
              <span className='absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50'></span>
              <span className='absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease'></span>
              <span className='relative'>Search</span>
            </span>
            <span
              className='absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0'
              data-rounded='rounded-lg'
            ></span>
          </button>
        </form>
      </div>
      {allProducts && allProducts.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8 pb-16'>
          {allProducts.map(product => (
            <Card key={product._id} product={product} refetch={refetch} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
          <Heading
            center={true}
            title='No Products Available At This Moment.'
            subtitle=''
          />
        </div>
      )}
    </Container>
  )
}

export default AllProducts
