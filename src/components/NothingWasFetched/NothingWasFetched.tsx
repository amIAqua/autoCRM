import { useTranslation } from 'react-i18next'

export const NothingWasFetched: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className='container'>
      <h1 style={{ margin: '100px auto' }}>{t('Ничего не найдено')} :(</h1>
    </div>
  )
}
