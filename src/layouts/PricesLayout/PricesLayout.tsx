import { Pricelist } from '../../components/Pricelist/Pricelist'
import { PricesSearch } from '../../components/PricesSearch/PricesSearch'

export const PricesLayout: React.FC = () => {
  return (
    <div>
      <PricesSearch />
      <Pricelist />
    </div>
  )
}
