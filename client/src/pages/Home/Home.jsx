import { Helmet } from 'react-helmet-async'
import Banner from '../../components/Home/Banner/Banner'
import FeaturedProducts from '../../components/Home/Featured/FeaturedProducts'
import TrendingProducts from '../../components/Home/Trending/TrendingProducts'
import Coupon from '../../components/Home/Coupon/Coupon'
import Heading from '../../components/Shared/Heading'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Tech Hunt | Browse & Discover latest tech</title>
      </Helmet>
      {/* Banner */}
      <Banner />

      {/* Featured Products */}
      <div className='pt-16'>
        <Heading
          title='Featured Products'
          subtitle='Browse through the best products'
          center
        />
      </div>
      <FeaturedProducts />

      {/* Trending Products */}
      <div className='pt-16'>
        <Heading
          title='Trending Products'
          subtitle='Browse through the Latest products'
          center
        />
      </div>
      <TrendingProducts />

      {/* Coupon Section */}
      <Coupon />
    </div>
  )
}

export default Home
