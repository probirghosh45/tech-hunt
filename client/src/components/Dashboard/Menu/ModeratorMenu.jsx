import { BsFingerprint } from 'react-icons/bs'
import { BsFillHouseAddFill } from 'react-icons/bs'
import MenuItem from '../Sidebar/MenuItem'

const ModeratorMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='Product Queue'
        address='product-queue'
      />
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Reported Contents'
        address='reported-contents'
      />
    </>
  )
}

export default ModeratorMenu
