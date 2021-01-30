export type casePosition =
  | {
      _id: string
      text: string
      price: number
    }
  | undefined
  | null

export type caseCostsListType = Array<casePosition>
