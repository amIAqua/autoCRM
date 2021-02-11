import { caseType } from '../../store/types/casesReducer.types'
import { Formik, FormikHelpers, Field, FormikErrors } from 'formik'
import { Input, Button } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useDispatch } from 'react-redux'
import { editCurrentCase } from '../../store/reducers/case_Reducer'
import { useHistory } from 'react-router-dom'
import { InputComponent } from '../FormFields/form-fields'
import { useMessages } from '../../utils/useMessages'
import { useTranslation } from 'react-i18next'

type Props = {
  currentCase: caseType
}

export const EditCurrentCaseForm: React.FC<Props> = ({ currentCase }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { successMessage } = useMessages()
  const { t } = useTranslation()
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
          successMessage(t('Заявка была отредактирована успешно'))
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
              <h3>{t('Владелец')}</h3>
              <Field
                name='ownerInfo.name'
                type='text'
                placeholder={t('Имя')}
                component={InputComponent}
              />

              {errors.ownerInfo?.name && touched.ownerInfo?.name}
              <Field
                name='ownerInfo.surname'
                type='text'
                placeholder={t('Фамилия')}
                component={InputComponent}
              />
              {errors.ownerInfo?.surname && touched.ownerInfo?.surname}
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

              <TextArea
                name='problems'
                placeholder={t('Описание неисправностей')}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.problems}
              />
            </section>
            <section className='result-info-form-section'>
              <h3>{t('Перечень выполненных работ')}</h3>

              <TextArea
                name='result'
                placeholder={t('Выполненные работы')}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.result}
              />
            </section>
            <section className='navigate-info-form-section'>
              <Input
                type='text'
                name='navigation.date'
                placeholder={t('Дата')}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.navigation.createdDate}
              />
              <Input
                type='text'
                name='navigation.worker'
                placeholder={t('Мастер')}
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
              {t('Сохранить')}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}
