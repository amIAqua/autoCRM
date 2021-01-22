import { caseType } from '../../store/types/casesReducer.types'
import { getDate } from '../../utils/helpers'

export const initialValues: caseType = {
  ownerInfo: {
    name: '',
    surname: '',
    adress: '',
    contacts: {
      email: '',
      phoneNumber: '',
    },
  },
  autoInfo: {
    brand: '',
    model: '',
    year: '',
    bodyNumber: '',
    engine: {
      volume: '',
      specification: '',
    },
  },
  problems: '',
  result: '',
  navigation: {
    createdDate: getDate(),
    completedDate: '',
    worker: '',
  },
  inProgress: false,
  completed: false,
}
