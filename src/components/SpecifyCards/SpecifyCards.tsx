import React, { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge } from 'antd'
import { useContainElements } from '../../utils/useContainElements'

const gridStyle: CSSProperties = {
  width: '25%',
  textAlign: 'center',
  fontWeight: 'bold',
  margin: '10px 10px',
  cursor: 'pointer',
}

export const SpecifyCards: React.FC = () => {
  const {
    allCasesLength,
    allCasesInProgressLength,
    allCompletedCasesLength,
  } = useContainElements()
  // TODO: LINKS ON THE FULL BLOCK
  return (
    <div className='specify-cards-container'>
      <Card.Grid style={gridStyle}>
        <Link className='specify-link' to='/new'>
          Оформить заявку
        </Link>
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Badge count={allCasesLength.length} className='card-badge'>
          <Link className='specify-link' to='/cases'>
            Необработанные заявки
          </Link>
        </Badge>
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Badge count={allCasesInProgressLength.length} className='card-badge'>
          <Link className='specify-link' to='/inprogress'>
            Выполняемые заявки
          </Link>
        </Badge>
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Badge count={allCompletedCasesLength.length} className='card-badge'>
          <Link className='specify-link' to='/completed'>
            Выполненные заявки
          </Link>
        </Badge>
      </Card.Grid>
    </div>
  )
}
