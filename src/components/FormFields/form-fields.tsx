import React from 'react'
import { Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

export const InputComponent: React.FC = (props: any) => {
  const { field, form, ...otherProps } = props
  return <Input {...field} {...otherProps} />
}

export const TextAreaComponent: React.FC = (props: any) => {
  const { field, form, ...otherProps } = props
  return <TextArea {...field} {...otherProps} />
}
