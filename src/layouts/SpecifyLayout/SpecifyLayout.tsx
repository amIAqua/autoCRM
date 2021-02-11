import { SpecifyCards } from '../../components/SpecifyCards/SpecifyCards'
import { useContainElements } from '../../utils/useContainElements'

export const SpecifyLayout: React.FC = () => {
  const contain = useContainElements()

  return (
    <div>
      <SpecifyCards contain={contain} />
    </div>
  )
}
