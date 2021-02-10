import React from 'react'
import { errorsType, initialValues } from './case-form-config'
import { caseType } from '../../store/types/casesReducer.types'
import {
  Formik,
  FormikErrors,
  FormikHelpers,
  Field,
  ErrorMessage,
} from 'formik'
import { Button, Checkbox } from 'antd'
import { InputComponent, TextAreaComponent } from '../FormFields/form-fields'
import { useNewCase } from '../../utils/useNewCase'
import { useTranslation } from 'react-i18next'

export const AddNewClientForm: React.FC = () => {
  const { addNewCaseHandler } = useNewCase()
  const { t } = useTranslation()

  return (
    <div className='form-container'>
      <Formik
        initialValues={initialValues}
        validate={(values: caseType) => {
          const errors: FormikErrors<errorsType> = {}
          if (!values.ownerInfo.name) {
            errors.name = 'Name is required'
          }
          if (!values.ownerInfo.surname) {
            errors.surname = 'Surname is required'
          }

          return errors
        }}
        onSubmit={(values: caseType, { setSubmitting }: FormikHelpers<any>) => {
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
              <h3>{t('Владелец')}</h3>
              <Field
                name='ownerInfo.name'
                type='text'
                placeholder={t('Имя')}
                component={InputComponent}
              />

              <ErrorMessage name='ownerInfo.name' component='div' />

              <Field
                name='ownerInfo.surname'
                type='text'
                placeholder={t('Фамилия')}
                component={InputComponent}
              />
              <ErrorMessage name='surname' component='div' />

              <Field
                name='ownerInfo.adress'
                type='text'
                placeholder={t('Адрес')}
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
                placeholder={t('Номер телефона')}
                component={InputComponent}
              />
            </section>
            <section className='auto-info-form-section'>
              <h3>{t('Автомобиль')}</h3>

              <Field
                name='autoInfo.brand'
                type='text'
                placeholder={t('Марка')}
                component={InputComponent}
              />
              <Field
                name='autoInfo.model'
                type='text'
                placeholder={t('Модель')}
                component={InputComponent}
              />
              <Field
                name='autoInfo.year'
                type='text'
                placeholder={t('Год выпуска')}
                component={InputComponent}
              />
              <Field
                name='autoInfo.bodyNumber'
                type='text'
                placeholder={t('Номер кузова')}
                component={InputComponent}
              />
              <Field
                name='autoInfo.engine.volume'
                type='text'
                placeholder={t('Объем двигателя')}
                component={InputComponent}
              />
              <Field
                name='autoInfo.engine.specification'
                type='text'
                placeholder={t('Тип двигателя')}
                component={InputComponent}
              />
            </section>
            <section className='problems-info-form-section'>
              <h3>{t('Жалобы и неисправности')}</h3>

              <Field
                name='problems'
                placeholder={t('Описание неисправностей')}
                component={TextAreaComponent}
              />
            </section>
            <section className='result-info-form-section'>
              <h3>{t('Перечень выполненных работ')}</h3>

              <Field
                name='result'
                placeholder={t('Описание выполненных работ')}
                component={TextAreaComponent}
              />
            </section>
            <section className='navigate-info-form-section'>
              <Field
                name='navigation.worker'
                placeholder={t('Мастер')}
                component={InputComponent}
              />
            </section>

            <div>
              <Checkbox
                className='add-checkbox'
                name='inProgress'
                value={values.inProgress}
                onChange={handleChange}
              >
                {t('Добавить в выполняемые')}
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
              {t('Добавить')}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}
