import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge } from 'antd'
import { allCasesListType } from '../../store/types/casesReducer.types'

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
  fontWeight: 'bold',
  margin: '10px 10px',
  cursor: 'pointer',
}

type Props = {
  contain: {
    cases: allCasesListType
    inProgress: allCasesListType
    completed: allCasesListType
  }
}

export const SpecifyCards: React.FC<Props> = ({ contain }) => {
  // TODO: LINKS ON THE FULL BLOCK
  return (
    <div className='specify-cards-container'>
      <Card.Grid style={gridStyle} className='specify-card'>
        <Link className='specify-link' to='/new'>
          Оформить заявку
        </Link>
      </Card.Grid>
      <Card.Grid style={gridStyle} className='specify-card'>
        <Badge count={contain.cases.length} className='card-badge'>
          <Link className='specify-link' to='/cases'>
            Необработанные заявки
          </Link>
        </Badge>
      </Card.Grid>
      <Card.Grid style={gridStyle} className='specify-card'>
        <Badge
          count={contain.inProgress.length}
          style={{ background: '#239ade' }}
          className='card-badge'
        >
          <Link className='specify-link' to='/inprogress'>
            Выполняемые заявки
          </Link>
        </Badge>
      </Card.Grid>
      <Card.Grid style={gridStyle} className='specify-card'>
        <Badge
          count={contain.completed.length}
          style={{ background: '#08c434' }}
          className='card-badge'
        >
          <Link className='specify-link' to='/completed'>
            Выполненные заявки
          </Link>
        </Badge>
      </Card.Grid>
    </div>
  )
}
