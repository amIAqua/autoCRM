import { FC } from 'react'
import { Card, Col, Row } from 'antd'
import { caseType } from '../../store/types/casesReducer.types'

type Props = {
  currentCase: caseType
}

export const CreateCostsCard: FC<Props> = ({ currentCase }) => {
  return (
    <div className='container'>
      <Card title={`No. ${currentCase.caseId}`} className='costs-case-card'>
        <Row>
          <Col span={12}>
            <Row className='card-row'>
              Имя: &nbsp;<b>{currentCase.ownerInfo.name}</b>
            </Row>
          </Col>
          <Col span={12}>
            <Row className='card-row'>
              Фамилия: &nbsp;<b>{currentCase.ownerInfo.surname}</b>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
