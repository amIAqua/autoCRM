import { useTranslation } from 'react-i18next'

export const useTableColumns = () => {
  const { t } = useTranslation()

  const tableColumns = () => {
    return [
      {
        title: 'No.',
        dataIndex: 'order',
        key: 'order',
        render: (order: number) => <p>{order}</p>,
      },

      {
        title: t('Позиция'),
        dataIndex: 'position',
        key: 'position',
        render: (text: string) => <h3>{text}</h3>,
      },
      {
        title: t('Стоимость'),
        dataIndex: 'price',
        key: 'price',
        render: (price: string) => <h3>{price}</h3>,
      },
    ]
  }
  return tableColumns
}
