import { AxiosError } from 'axios'

export type QueryError = AxiosError<{ message: string }>
