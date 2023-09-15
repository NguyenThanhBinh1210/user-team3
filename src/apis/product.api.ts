import http from '~/utils/http'

export const getProduct = (params?: unknown) => http.get('/product/get-all', { params })
export const getAccount = () => http.get('/auth/info-login-discord')
