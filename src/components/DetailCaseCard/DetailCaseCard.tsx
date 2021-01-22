import React from 'react'
import { Button, Card, Col, Divider, Row } from 'antd'
import { Link } from 'react-router-dom'
import { caseType } from '../../store/types/casesReducer.types'

type Props = {
  item: caseType
  deleteItemHandler: (_id: string) => void
  takeInProgressHandler: (_id: string) => void
  completeCaseHandler: (_id: string) => void
}

export const DetailCaseCard: React.FC<Props> = ({
  item,
  deleteItemHandler,
  takeInProgressHandler,
  completeCaseHandler,
}) => {
  return (
    <div className='container'>
      <Card title={`No. ${item.caseId}`} className='details-case-card'>
        <h2>Владелец</h2>
        <Row>
          <Col span={12}>
            <Row className='card-row'>
              Имя: &nbsp;<b>{item.ownerInfo.name}</b>
            </Row>
            <Row className='card-row'>
              Телефон: &nbsp;<b>{item.ownerInfo.contacts.phoneNumber}</b>
            </Row>
          </Col>
          <Col span={12}>
            <Row className='card-row'>
              Фамилия: &nbsp;<b>{item.ownerInfo.surname}</b>
            </Row>
            <Row className='card-row'>
              Email: &nbsp;<b>{item.ownerInfo.contacts.email}</b>
            </Row>
          </Col>
        </Row>
        <Divider />
        <h2>Автомобиль</h2>
        <Row>
          <Col span={12}>
            <Row className='card-row'>
              Марка: &nbsp;<b>{item.autoInfo.brand}</b>
            </Row>
            <Row className='card-row'>
              Год выпуска: &nbsp;<b>{item.autoInfo.year}</b>
            </Row>
            <Row>
              Объем двигателя: &nbsp;<b>{item.autoInfo.engine.volume}</b>
            </Row>
          </Col>
          <Col span={12}>
            <Row className='card-row'>
              Модель: &nbsp;<b>{item.autoInfo.model}</b>
            </Row>
            <Row className='card-row'>
              Номер кузова: &nbsp;<b>{item.autoInfo.bodyNumber}</b>
            </Row>
            <Row className='card-row'>
              Спецификация: &nbsp;<b>{item.autoInfo.engine.specification}</b>
            </Row>
          </Col>
        </Row>
        <Divider />
        <h2>Перечень неисправностей</h2>
        <p>{item.problems}</p>
        <Divider />
        <h2>Перечень выполненных работ</h2>
        <p>{item.result}</p>
        <Divider />
        <p>Мастер: &nbsp;{item.navigation.worker}</p>
        <p>
          Дата оформления заявки: &nbsp;<b>{item.navigation.createdDate}</b>
        </p>
        {item.completed && item.navigation.completedDate ? (
          <p>
            Дата выполнения заявки: &nbsp;<b>{item.navigation.completedDate}</b>
          </p>
        ) : null}

        <Divider />
        <Link to={`edit/${item._id}`}>
          <Button type='primary' style={{ marginRight: '10px' }}>
            Редактировать
          </Button>
        </Link>

        {!item.inProgress && !item.completed ? (
          <Button
            type='primary'
            style={{ marginRight: '10px' }}
            onClick={() => takeInProgressHandler(item._id!)}
          >
            Начать выполнение
          </Button>
        ) : null}
        {item.inProgress && !item.completed ? (
          <Button
            type='primary'
            style={{ marginRight: '10px' }}
            onClick={() => completeCaseHandler(item._id!)}
          >
            Завершить выполнение
          </Button>
        ) : null}

        {item.completed || !item.inProgress ? (
          <Button
            type='primary'
            style={{ marginRight: '10px' }}
            onClick={() => deleteItemHandler(item._id!)}
          >
            Удалить
          </Button>
        ) : null}

        {item.completed ? <Button type='primary'>Распечатать</Button> : null}
      </Card>
    </div>
  )
}
