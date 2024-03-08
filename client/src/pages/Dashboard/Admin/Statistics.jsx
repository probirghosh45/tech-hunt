import { useQuery } from '@tanstack/react-query'
import { Chart } from 'react-google-charts'
import { getAdminStat } from '../../../api/utils'
import Loader from '../../../components/Shared/Loader'

export const options = {
  title: 'User & Product Data',
  is3D: true,
}
const Statistics = () => {
  const { data: statData = [], isLoading } = useQuery({
    queryKey: ['statData'],
    queryFn: async () => await getAdminStat(),
  })
  if (isLoading) return <Loader />
  return (
    <Chart
      chartType='PieChart'
      data={statData.chartData}
      options={options}
      width={'100%'}
      height={'600px'}
    />
  )
}

export default Statistics
