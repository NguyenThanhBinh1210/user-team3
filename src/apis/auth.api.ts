import { AuthResponse } from '~/types/auth.type'
import { User } from '~/types/user.type'
import http from '~/utils/http'
interface BodyUpdateProfile extends Omit<User, '_id' | 'role' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

export const loginAccount = (body: { username: string; password: string }) => http.post('/user/auth/sign-in', body)
export const registerAccount = (body: { username: string; email: string; password: string }) =>
  http.post('/user/auth/register', body)
export const logout = () => http.post('/user/log-out')
export const updateUser = (id: unknown, params?: Omit<BodyUpdateProfile, '_id'>) =>
  http.put<User>(`/user/update-user/${id}`, params)
export const getUser = (id: unknown) => http.get<User>(`/user/get-details/${id}`)
// export const refreshToken = (body: { refresh_token: string }) => http.post('/user/refresh-token', body)
export const refreshToken = () =>
  http.post('/user/refresh-token', {
    withCredentials: true
  })
