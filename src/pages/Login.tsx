import { useForm } from 'react-hook-form'
import Input from '../components/Input/Input'
import React, { useState } from 'react'
import { AppContext } from '~/contexts/app.context'
import axios from 'axios'
import { setAccesTokenToLS, setProfileFromLS } from '~/utils/auth'
import { toast } from 'react-toastify'
import { loginAccount, registerAccount } from '~/apis/auth.api'
import { useMutation } from 'react-query'
import { omit } from 'lodash'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { register, handleSubmit } = useForm<FormData>({})
  const [error, setError] = useState<string | null>(null)

  const { setIsAuthenticated, setProfile } = React.useContext(AppContext)
  const [isLoginType, setType] = React.useState(true)
  const handleLLogin = async (data: any) => {
    try {
      // const url = 'https://api-discord-yzpf.onrender.com/api/v1/admin/login'
      // const response = await axios.post(url, data)
      setIsAuthenticated(true)
      setProfileFromLS('response.data')
      setAccesTokenToLS('response.data')
      toast('Đăng nhập thành công!')
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const navigate = useNavigate()

  const handleRegister = async (data: any) => {
    try {
      // const url = 'https://api-discord-yzpf.onrender.com/api/v1/admin/login'
      // const response = await axios.post(url, data)
      setIsAuthenticated(true)
      setProfileFromLS('response.data')
      setAccesTokenToLS('response.data')
      toast('Đăng ký thành công!')
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const mutation = useMutation((body: any) => {
    return loginAccount(body)
  })
  const mutationRegister = useMutation((body: any) => {
    return registerAccount(body)
  })
  const onSubmitLogin = (data: any) => {
    mutation.mutate(data, {
      onSuccess: (dataUser) => {
        const newUser = omit(dataUser.data.user, ['password', 'isAdmin'])
        setProfile(newUser)
        toast.success('Đăng nhập thành công!')
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (data: any) => {
        console.log(data.response.data)
        setError(data.response.data)
      }
    })
  }
  const onSubmitRegister = (data: any) => {
    mutationRegister.mutate(data, {
      onSuccess: () => {
        toast.success('Đăng ký thành công!')
        setType(true)
      },
      onError: (data: any) => {
        console.log(data.response.data)
        setError(data.response.data)
      }
    })
  }

  return (
    <div className='flex w-[400px] border rounded-lg shadow-md absolute  left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className=' text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          {isLoginType ? 'Đăng nhập' : 'Đăng ký'}
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit(isLoginType ? onSubmitLogin : onSubmitRegister)} >
          {!isLoginType && (

            <div>
              <label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900'>
                Tên
              </label>
              <div className='mt-2'>
                <input
                  id='name'
                  type='text'
                  {...register('name')}
                  autoComplete='name'
                  required
                  onFocus={() => setError(null)}
                  className='block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
              Tài khoản
            </label>
            <div className='mt-2'>
              <input
                id='username'
                type='text'
                {...register('username')}
                autoComplete='username'
                required
                onFocus={() => setError(null)}
                className='block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
              Mật khẩu
            </label>
            <div className='mt-2'>
              <input
                id='password'
                type='password'
                {...register('password')}
                autoComplete='current-password'
                required
                onFocus={() => setError(null)}
                className='block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          <div className='py-2 text-red-300'>{error !== null && error}</div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              {isLoginType ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </div>
        </form>

        <p className='mt-10 text-center text-sm text-gray-500'>
          {isLoginType ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
          <button
            onClick={() => setType(!isLoginType)}
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            {isLoginType ? 'Đăng ký' : 'Đăng nhập'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
