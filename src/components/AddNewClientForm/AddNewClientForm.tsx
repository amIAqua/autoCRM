import React from 'react'
import { initialValues } from './case-form-config'
import { caseType } from '../../store/types/casesReducer.types'
import { Formik, FormikErrors, FormikHelpers, Field } from 'formik'
import { Button, Checkbox } from 'antd'
import { InputComponent, TextAreaComponent } from '../FormFields/form-fields'
import { useNewCase } from '../../utils/useNewCase'

export const AddNewClientForm: React.FC = () => {
  const { addNewCaseHandler } = useNewCase()

  return (
    <div className='form-container'>
      <Formik
        initialValues={initialValues}
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
          addNewCaseHandler(values)

          setSubmitting(false)
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
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

              <Field
                name='problems'
                placeholder='Описание неисправностей'
                component={TextAreaComponent}
              />
            </section>
            <section className='result-info-form-section'>
              <h3>Перечень выполненных работ</h3>

              <Field
                name='result'
                placeholder='Описание выполненных работ'
                component={TextAreaComponent}
              />
            </section>
            <section className='navigate-info-form-section'>
              <Field
                name='navigation.worker'
                placeholder='Мастер'
                component={InputComponent}
              />
            </section>

            <div>
              <Checkbox
                name='inProgress'
                value={values.inProgress}
                onChange={handleChange}
              >
                Добавить в выполняемые
              </Checkbox>
            </div>

            <Button
              htmlType='submit'
              className='button'
              type='primary'
              size='large'
              disabled={isSubmitting}
              style={{ marginTop: '20px' }}
            >
              Добавить
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}
