import { caseType } from '../../store/types/casesReducer.types'
import { CasesListItem } from './CasesListItem/CasesListItem'

type Props = {
  allCases: Array<caseType>
}

export const AllCasesList: React.FC<Props> = ({ allCases }) => {
  return (
    <div className=''>
      {allCases.map((item: caseType) => {
        return <CasesListItem item={item} key={item._id} />
      })}
    </div>
  )
}
