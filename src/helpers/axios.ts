import axios, { AxiosInstance } from 'axios'

const AxiosClient = (): AxiosInstance => {
  const axiosClient = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BACKEND_HOST,
  })

  return axiosClient
}

export default AxiosClient()
