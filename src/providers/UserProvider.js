import NewUser from '@/components/NewUser'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()
export default function ({ children }) {
  const [userNickName, setUserNickName] = useState(null)
  useEffect(() => {
    const localStorageNick = window.localStorage.getItem('userNickName')
    if (localStorageNick) setUserNickName(localStorageNick)
  }, [])
  const setUserNickNameWithLocalStorage = (newUserNickName) => {
    window.localStorage.setItem('userNickName', newUserNickName)
    setUserNickName(newUserNickName)
  }
  return (
    <UserContext.Provider value={{ userNickName, setUserNickNameWithLocalStorage }}>
      {userNickName ? children : <NewUser />}
    </UserContext.Provider>
  )
}
