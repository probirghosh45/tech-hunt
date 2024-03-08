import Heading from '../../components/Shared/Heading'
import useRole from '../../hooks/useRole'

const Welcome = () => {
  const [role] = useRole()
  return (
    <div className='h-screen gap-5 flex flex-col justify-center items-center pb-16 '>
      {role ? (
        <Heading
          center={true}
          title={`Welcome to ${role?.toUpperCase()} Dashboard.`}
          subtitle={'Navigate through left sidebar menu.'}
        />
      ) : (
        <p>Loading..</p>
      )}
    </div>
  )
}

export default Welcome
