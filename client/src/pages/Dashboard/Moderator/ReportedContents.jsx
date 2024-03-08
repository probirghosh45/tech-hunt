import { Helmet } from 'react-helmet-async'
import EmptyState from '../../../components/Shared/EmptyState'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../../components/Shared/Loader'
import { getAllProducts } from '../../../api/products'
import ReportedProductRow from '../../../components/Dashboard/TableRows/ReportedProductRow'

const ReportedContents = () => {
  const {
    refetch,
    data: products = [],
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await getAllProducts(),
  })
  if (isLoading) return <Loader />
  console.log(products)
  return (
    <>
      <Helmet>
        <title>My Listings</title>
      </Helmet>
      {products && Array.isArray(products) && products.length > 0 ? (
        <div className='container mx-auto px-4 sm:px-8'>
          <div className='py-8'>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Image
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Name
                      </th>

                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        UpVote
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        DownVote
                      </th>

                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products
                        .filter(p => p.isReported === true)
                        .map(product => (
                          <ReportedProductRow
                            key={product?._id}
                            product={product}
                            refetch={refetch}
                          />
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          message='Saints are posting Products, No spam🥴'
          address='/'
          label='Go Home'
        />
      )}
    </>
  )
}

export default ReportedContents
