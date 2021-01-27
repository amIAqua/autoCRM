import React from 'react'
import { caseType } from '../../store/types/casesReducer.types'
import { Formik, FormikHelpers, Field, FormikErrors } from 'formik'
import { Input, Button } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useDispatch } from 'react-redux'
import { editCurrentCase } from '../../store/reducers/case_Reducer'
import { useHistory } from 'react-router-dom'
import { InputComponent } from '../FormFields/form-fields'
import { useMessages } from '../../utils/useMessages'

type Props = {
  currentCase: caseType
}

export const EditCurrentCaseForm: React.FC<Props> = ({ currentCase }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { successMessage } = useMessages()
  return (
    <div className='form-container'>
      <Formik
        initialValues={currentCase}
        validate={(values: caseType) => {
          const errors: FormikErrors<any> = {}
          if (!values.ownerInfo.name) {
            errors.name = 'Name is equired'
          }
          if (!values.ownerInfo.surname) {
            errors.surname = 'Surname is required'
          }

          return errors
        }}
        onSubmit={(
          values: caseType,
          { setSubmitting }: FormikHelpers<caseType>
        ) => {
          dispatch(editCurrentCase(values, currentCase._id!))
          setSubmitting(false)

          history.push(`/cases/${currentCase._id}`)
          successMessage('Заявка была отредактирована успешно')
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <section className='owner-info-form-section'>
              <h3>Владелец</h3>
              <Field
                name='ownerInfo.name'
                type='text'
                placeholder='Имя'
                component={InputComponent}
              />

              {errors.ownerInfo?.name && touched.ownerInfo?.name}
              <Field
                name='ownerInfo.surname'
                type='text'
                placeholder='Фамилия'
                component={InputComponent}
              />
              {errors.ownerInfo?.surname && touched.ownerInfo?.surname}
              <Field
                name='ownerInfo.adress'
                type='text'
                placeholder='Адрес'
                component={InputComponent}
              />
              <Field
                name='ownerInfo.contacts.email'
                type='text'
                placeholder='Email'
                component={InputComponent}
              />
              <Field
                name='ownerInfo.contacts.phoneNumber'
                type='text'
                placeholder='Номер телефона'
                component={InputComponent}
              />
            </section>
            <section className='auto-info-form-section'>
              <h3>Автомобиль</h3>

              <Field
                name='autoInfo.brand'
                type='text'
                placeholder='Марка'
                component={InputComponent}
              />

              <Field
                name='autoInfo.model'
                type='text'
                placeholder='Модель'
                component={InputComponent}
              />
              <Field
                name='autoInfo.year'
                type='text'
                placeholder='Год выпуска'
                component={InputComponent}
              />
              <Field
                name='autoInfo.bodyNumber'
                type='text'
                placeholder='Номер кузова'
                component={InputComponent}
              />
              <Field
                name='autoInfo.engine.volume'
                type='text'
                placeholder='Объем двигателя'
                component={InputComponent}
              />
              <Field
                name='autoInfo.engine.specification'
                type='text'
                placeholder='Тип двигателя'
                component={InputComponent}
              />
            </section>
            <section className='problems-info-form-section'>
              <h3>Жалобы и неисправности</h3>

              <TextArea
                name='problems'
                placeholder='Описание неисправностей'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.problems}
              />
            </section>
            <section className='result-info-form-section'>
              <h3>Перечень выполненных работ</h3>

              <TextArea
                name='result'
                placeholder='Выполненные работы'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.result}
              />
            </section>
            <section className='navigate-info-form-section'>
              <Input
                type='text'
                name='navigation.date'
                placeholder='Дата'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.navigation.createdDate}
              />
              <Input
                type='text'
                name='navigation.worker'
                placeholder='Ф.И.О мастера'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.navigation.worker}
              />
            </section>

            <Button
              htmlType='submit'
              type='primary'
              disabled={isSubmitting}
              className='button'
              size='large'
              style={{ marginTop: '20px' }}
            >
              Сохранить
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}
