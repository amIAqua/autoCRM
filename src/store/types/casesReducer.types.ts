export type caseType = {
  caseId?: string
  ownerInfo: {
    name: string
    surname: string
    adress: string
    contacts: {
      email: string
      phoneNumber: string
    }
  }
  autoInfo: {
    brand: string
    model: string
    year: string
    bodyNumber: string
    engine: {
      volume: string
      specification: string
    }
  }
  problems: string
  result: string
  navigation: {
    createdDate: string
    completedDate: string
    worker: string
  }
  _id?: string
  inProgress: boolean
  completed: boolean
}

export type allCasesListType = Array<caseType>
