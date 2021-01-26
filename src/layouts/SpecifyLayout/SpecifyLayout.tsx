import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SpecifyCards } from '../../components/SpecifyCards/SpecifyCards'
import { RootAppState } from '../../store'
import { errorsSelector } from '../../store/selectors'
import { useContainElements } from '../../utils/useContainElements'
import { useMessages } from '../../utils/useMessages'

export const SpecifyLayout: React.FC = () => {
  const contain = useContainElements()
  const error = useSelector((state: RootAppState) => errorsSelector(state))
  const { errorMessage } = useMessages()

  return (
    <div>
      <SpecifyCards contain={contain} />
    </div>
  )
}
