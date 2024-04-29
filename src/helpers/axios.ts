import axios, { AxiosInstance } from 'axios';

const AxiosClient = (): AxiosInstance => {
  const axiosClient = axios.create({
    withCredentials: true,
    baseURL: 'http://172.16.70.190/api',
  });

  return axiosClient;
};

export default AxiosClient();