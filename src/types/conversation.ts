export interface Conversation {
  id: string
  userId: string
  title: string
  categoryId: string
  createdAt: string
  updatedAt: string
  messages: []
  user: {
    id: string
    name: string
    username: string
    email: string
    role: string
    phoneNumber: string
    profilePic: string
    city: string
    region: string
    zipCode: string
    score: number
    createdAt: string
    updatedAt: string
  }
}
