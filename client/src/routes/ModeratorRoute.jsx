/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'
import Loader from '../components/Shared/Loader'
import useRole from '../hooks/useRole'

const ModeratorRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <Loader />
  if (role === 'moderator') return children
  return <Navigate to='/dashboard' />
}

export default ModeratorRoute
