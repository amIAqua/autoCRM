import { FC } from 'react'
import { Card, Col, Row } from 'antd'
import { caseType } from '../../store/types/casesReducer.types'
import { useTranslation } from 'react-i18next'

type Props = {
  currentCase: caseType
}

export const CreateCostsCard: FC<Props> = ({ currentCase }) => {
  const { t } = useTranslation()

  return (
    <div className='container'>
      <Card title={`No. ${currentCase.caseId}`} className='costs-case-card'>
        <Row>
          <Col span={12}>
            <Row className='card-row'>
              {t('Имя')}: &nbsp;<b>{currentCase.ownerInfo.name}</b>
            </Row>
          </Col>
          <Col span={12}>
            <Row className='card-row'>
              {t('Фамилия')}: &nbsp;<b>{currentCase.ownerInfo.surname}</b>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
