import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge, Button } from 'antd'
import { allCasesListType } from '../../store/types/casesReducer.types'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  // TODO: LINKS ON THE FULL BLOCK
  return (
    <div className='container'>
      <Button className='specify-card'>
        <Link className='specify-link' to='/new'>
          {t('Оформить заявку')}
        </Link>
      </Button>
      <Badge count={contain.cases.length} className='card-badge'>
        <Button className='specify-card'>
          <Link className='specify-link' to='/cases'>
            {t('Необработанные заявки')}
          </Link>
        </Button>
      </Badge>

      <Badge
        count={contain.inProgress.length}
        style={{ background: '#239ade' }}
        className='card-badge'
      >
        <Button className='specify-card'>
          <Link className='specify-link' to='/inprogress'>
            {t('Выполняемые заявки')}
          </Link>
        </Button>
      </Badge>

      <Badge
        count={contain.completed.length}
        style={{ background: '#08c434' }}
        className='card-badge'
      >
        <Button className='specify-card'>
          <Link className='specify-link' to='/completed'>
            {t('Выполненные заявки')}
          </Link>
        </Button>
      </Badge>
    </div>
  )
}
