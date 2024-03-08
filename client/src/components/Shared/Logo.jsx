import { Link } from 'react-router-dom'
import logoImg from '../../assets/images/logo.png'
const Logo = () => {
  return (
    <Link to='/'>
      <img
        // className='hidden md:block'
        src={logoImg}
        alt='logo'
        width='42'
        height='42'
      />
    </Link>
  )
}

export default Logo
