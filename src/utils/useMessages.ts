import { message } from 'antd'

export const useMessages = () => {
  const successMessage = (text: string) => message.success(text)
  const warningMessage = (text: string) => message.warning(text)
  const errorMessage = (text: string) => message.error(text)

  return { successMessage, warningMessage, errorMessage }
}
