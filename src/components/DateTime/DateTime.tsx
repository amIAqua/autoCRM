import { FC, useEffect, useState } from 'react'
import { dateFormatter } from '../../utils/helpers'

export const DateTime: FC = () => {
  const [currentDateAndTime, setCurrentDateAndTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateAndTime(new Date())
    }, 60000)

    return () => clearInterval(interval)
  })
  return (
    <div
      style={{
        width: '256px',
        height: '50px',
        marginTop: '20px',
        background: '#001529',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h3 style={{ color: '#fff', paddingTop: '5px' }}>
        {dateFormatter(currentDateAndTime)}
      </h3>
    </div>
  )
}
