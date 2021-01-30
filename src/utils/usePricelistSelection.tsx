import { useEffect } from 'react'
import { Select } from 'antd'
import { pricelistService } from '../store/services/PricelistService'
import { costsService } from '../store/services/CostsService'
import { priceListItemType } from '../store/types/pricesService.types'

const { Option } = Select

export const usePricelistSelection = () => {
  useEffect(() => {
    const getData = async () => {
      await pricelistService.getAllPricelistFromDB()
    }
    getData()
  }, [])

  const handleSelectChangeChange = (value: string) => {
    costsService.setTextValue(value)
  }

  const returnSelectWithOptions = () => {
    return (
      <Select
        size='middle'
        onChange={handleSelectChangeChange}
        placeholder='Выберите позицию из списка'
        style={{ width: 500 }}
      >
        {pricelistService.priceslist.map((item: priceListItemType) => {
          return (
            <Option key={item?._id} value={item!.text}>
              {item!.text}/{item!.price}
            </Option>
          )
        })}
      </Select>
    )
  }

  return { returnSelectWithOptions }
}
