import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useUserStore } from "../stores/UserStore";
import { useEffect } from "react";

export default function useJwtLogin() {
  const { isLoading, data, isSuccess, isError, error } = useQuery<{ username: string }, AxiosError<{ message: string }>>({
    queryKey: ['jwt-login'],
    queryFn: async () => {
      const response = await axios.get<{ username: string }>('http://localhost:3000/auth/login', { withCredentials: true });
      return response.data;
    },
    retry: 1
  })

  const { setUsername } = useUserStore()
  
  useEffect(() => {
    if (isLoading) return

    if (isSuccess) {
      setUsername(data.username)
    } else {
      setUsername('')
    }
  }, [isLoading]);

  return { isSuccess, isError, error, isLoading }
}