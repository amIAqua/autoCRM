import { useEffect } from 'react'
import { Select } from 'antd'
import { pricelistService } from '../store/services/PricelistService'
import { costsService } from '../store/services/CostsService'
import { priceListItemType } from '../store/types/pricesService.types'
import { useTranslation } from 'react-i18next'

const { Option } = Select

export const usePricelistSelection = () => {
  const { t } = useTranslation()

  useEffect(() => {
    pricelistService.getAllPricelistFromDB()
  }, [])

  const handleSelectChangeChange = (value: string) => {
    costsService.setTextValue(value)
  }

  const returnSelectWithOptions = () => {
    return (
      <Select
        size='middle'
        onChange={handleSelectChangeChange}
        placeholder={t('Выберите позицию из списка')}
        style={{ width: 500 }}
      >
        {pricelistService.priceslist.map((item: priceListItemType) => {
          return (
            <Option key={item?._id} value={item!.text}>
              <main>{item!.text}</main>
            </Option>
          )
        })}
      </Select>
    )
  }

  return { returnSelectWithOptions }
}
