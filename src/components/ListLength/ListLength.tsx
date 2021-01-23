import React from 'react'

type Props = {
  length: number
}

export const ListLength: React.FC<Props> = ({ length }) => (
  <div>
    <h4>Заявок в списке: &nbsp;{length}</h4>
  </div>
)
