import { useTranslation } from 'react-i18next'

type Props = {
  length: number
}

export const ListLength: React.FC<Props> = ({ length }) => {
  const { t } = useTranslation()
  return (
    <div>
      <h4>
        {t('Заявок в списке')} : &nbsp;{length}
      </h4>
    </div>
  )
}
