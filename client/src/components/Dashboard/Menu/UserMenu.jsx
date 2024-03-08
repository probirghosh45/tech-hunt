import { BsFingerprint } from 'react-icons/bs'
import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork } from 'react-icons/md'
import MenuItem from '../Sidebar/MenuItem'

const UserMenu = () => {
  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Profile' address='my-profile' />
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Product'
        address='add-product'
      />
      <MenuItem icon={MdHomeWork} label='My Products' address='my-products' />
    </>
  )
}

export default UserMenu
