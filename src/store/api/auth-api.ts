import axios from './axios.config'

export const authAPI = {
  login: async (userId: string, password: string): Promise<any> => {
    const token = await axios.post(
      '/auth',
      JSON.stringify({ userId, password })
    )
    return token.data
  },
}
