/* eslint-disable prettier/prettier */
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '~/contexts/app.context'
import { FormatNumber } from '~/hooks/useFormatNumber'
import { clearLS } from '~/utils/auth'

const data = [
  {
    id: '1',
    title: '1 Tháng',
    price: 100000,
  },
  {
    id: '2',
    title: '3 Tháng',
    price: 300000,

  },
  {
    id: '3',
    price: 600000,
    title: '6 Tháng',
  },
  {
    id: '4',
    price: 1200000,
    title: '12 Tháng',
  }
]
const Dashboard = () => {
  const [isChoose, setChoose] = useState<null | number>(null)
  const { reset, profile } = useContext(AppContext)
  const handleLogout = () => {
    reset()
    clearLS()
    toast.success('Đăng xuất thành công!')
  }
  return (
    <div className='w-screen h-screen flex flex-col gap-y-5 p-4 bg-[#F7F7F9]'>
      <div className='h-[100px] shadow-md flex items-center justify-between px-4 rounded-lg bg-white mx-4 mobile:mx-2'>
        <div className='flex items-center space-x-4'>
          <div className='relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
            <svg
              className='absolute w-12 h-12 text-gray-400 -left-1'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <div className='font-medium dark:text-white'>
            <div>{profile?.name}</div>
            <div className='text-sm text-gray-500 dark:text-gray-400'>{profile?.username}</div>
          </div>
        </div>
        <button
          type='button'
          onClick={handleLogout}
          className='h-max text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Logout
        </button>
      </div>
      <div className='flex flex-1 flex-wrap'>
        {data.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setChoose(idx)}
            className={`${isChoose === idx ? ' border-2 border-blue-400' : ''
              } w-[23%] relative flex-col overflow-hidden mobile:w-[46%] mobile:mx-[2%]  mobile:mb-[4%] tablet:w-[31%] tablet:mb-[2%] hover:translate-y-[-4px] justify-center py-4 flex mx-[1%] bg-white shadow-xl hover:shadow-2xl cursor-pointer transition-all rounded-lg text-lg`}
          >
            <div className='w-full h-full'>
              <h2 className='text-2xl font-bold'>{item.title}</h2>
              <div className='text-[40px] font-bold mt-[30%]'>{FormatNumber(item.price)}VNĐ</div>
            </div>
            <div
              className={`${isChoose === idx ? 'bottom-0' : 'bottom-[-80px]'
                } transition-all w-full absolute h-20 bg-blue-400 text-white font-[400] flex items-center justify-center`}
            >
              <h3>User name</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
