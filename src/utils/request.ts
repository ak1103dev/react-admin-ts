import axios from 'axios'

export const TOKEN_KEY = process.env.REACT_APP_ACCESS_TOKEN_KEY || 'accessToken'
export const BASE_URL = process.env.REACT_APP_API_URL

const instance = axios.create({
  baseURL: BASE_URL,
})

instance.interceptors.request.use(
  async function (config) {
    const token = await localStorage.getItem(TOKEN_KEY)
    return {
      ...config,
      headers: {
        accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
