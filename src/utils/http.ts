import axios, { type AxiosInstance } from 'axios'
import omit from 'lodash/omit'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccesTokenToLS,
  setProfileFromLS,
  setRefreshTokenToLS
} from './auth'
import { toast } from 'react-toastify'
class Http {
  instance: AxiosInstance
  private accessToken: string
  // private refreshToken: string
  // private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    // this.refreshToken = getRefreshTokenFromLS()
    // this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: 'https://api-tool-key.onrender.com/api/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers['Authorization'] = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/user/auth/sign-in') {
          const dataProfile = response
          const newUser = omit(dataProfile.data.user, ['password', 'isAdmin'])
          this.accessToken = response.data.token
          // this.refreshToken = response.data.refresh_token
          setProfileFromLS(newUser as any)
          setAccesTokenToLS(this.accessToken)
          // setRefreshTokenToLS(this.refreshToken)
        } else if (url === '/user/log-out') {
          // this.accessToken = ''
          // this.refreshToken = ''
          // clearLS()
        }
        return response
      }
      // (error) => {
      //   const config = error.response?.config || {}
      //   const { url } = config
      //   if (url !== 'user/refresh-token') {
      //     this.refreshTokenRequest = this.refreshTokenRequest
      //       ? this.refreshTokenRequest
      //       : this.handleRefreshToken().finally(() => {
      //           this.refreshTokenRequest = null
      //         })
      //     return this.refreshTokenRequest.then((access_token) => {
      //       return this.instance({ ...config, headers: { ...config.headers, token: `Beare ${access_token}` } })
      //     })
      //   }
      //   toast.warn('Hết phiên đăng nhập, hãy đăng nhập lại!')
      //   clearLS()
      //   this.accessToken = ''
      //   this.refreshToken = ''
      //   return Promise.reject(error)
      // }
    )
  }
  // private handleRefreshToken() {
  //   return this.instance
  //     .post('user/refresh-token', {
  //       refresh_token: this.refreshToken
  //     })
  //     .then((res) => {
  //       const { access_token } = res.data.data
  //       setAccesTokenToLS(access_token)
  //       this.accessToken = access_token
  //       return access_token
  //     })
  //     .catch((error) => {
  //       window.location.reload()
  //       clearLS()
  //       this.accessToken = ''
  //       this.refreshToken = ''
  //       throw error
  //     })
  // }
}

const http = new Http().instance

export default http
