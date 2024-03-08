import { FaUserCog } from 'react-icons/fa'
import { BsGraphUp } from 'react-icons/bs'
import MenuItem from '../Sidebar/MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={BsGraphUp} label='Statistics' address='statistics' />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem
        icon={FaUserCog}
        label='Manage Coupons'
        address='manage-coupons'
      />
    </>
  )
}

export default AdminMenu
