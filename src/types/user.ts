export interface User {
  id: string
  username: string
  email: string
  role: string
  phoneNumber: string | null
  profilePic: string | null
  city: string | null
  region: string | null
  zipCode: string | null
  score: number
  createdAt: string
  updatedAt: string
}
