import { useQuery } from '@tanstack/react-query'
import Loader from '../../Shared/Loader'
import Container from '../../Shared/Container'
import Heading from '../../Shared/Heading'
import Card from '../../Shared/Card'
import { getAllProducts } from '../../../api/products'

const FeaturedProducts = () => {
  const {
    refetch,
    data: products = [],
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await getAllProducts(),
  })

  if (isLoading) return <Loader />
  return (
    <Container>
      {products && products.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8'>
          {products
            .filter(p => p.isApproved === 'Approved' && p.isFeatured === true)
            .map(product => (
              <Card key={product._id} product={product} refetch={refetch} />
            ))}
        </div>
      ) : (
        <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
          <Heading
            center={true}
            title='No Products Available In This Category!'
            subtitle='Please Select Other Categories.'
          />
        </div>
      )}
    </Container>
  )
}

export default FeaturedProducts
