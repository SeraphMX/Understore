import { User } from '../types'

export const users: User[] = [
  {
    id: '1',
    username: 'demo',
    phoneNumber: '1234567890',
    password: 'demo',
    socialLink: 'https://example.com/demo',
    isApproved: true,
    role: 'user'
  },
  {
    id: '2',
    username: 'admin',
    phoneNumber: '9876543210',
    password: 'demo',
    socialLink: 'https://example.com/admin',
    isApproved: true,
    role: 'admin'
  },
  {
    id: '3',
    username: 'staff',
    phoneNumber: '5555555555',
    password: 'demo',
    socialLink: 'https://example.com/staff',
    isApproved: true,
    role: 'staff'
  }
]

export const findUser = (identifier: string, password: string): User | undefined => {
  return users.find((user) => (user.username === identifier || user.phoneNumber === identifier) && user.password === password)
}
