import NewUser from '@/components/NewUser'
import { Center, Spinner } from '@chakra-ui/react'
import { createContext, useEffect, useState } from 'react'

const STATE_ENUMS = {
  loading: 0,
  unauthenticated: 1,
  authenticated: 2
}

const InitialLoadingScreen = () => {
  return (
    <Center height='100vh' width='100vw' position='relative' bgColor='blue.800'>
      <Spinner color='blue.400' boxSize='50vw' thickness='7px' display='block' />
    </Center>
  )
}

export const UserContext = createContext()

export default function ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(STATE_ENUMS.loading)
  const [userNickName, setUserNickName] = useState(null)

  useEffect(() => {
    const localStorageNick = window.localStorage.getItem('userNickName')
    if (localStorageNick) {
      setUserNickName(localStorageNick)
      setIsAuthenticated(STATE_ENUMS.authenticated)
    } else setIsAuthenticated(STATE_ENUMS.unauthenticated)
  }, [])

  const setUserNickNameWithLocalStorage = (newUserNickName) => {
    window.localStorage.setItem('userNickName', newUserNickName)
    setUserNickName(newUserNickName)
    setIsAuthenticated(STATE_ENUMS.authenticated)
  }
  const renderOptions = {
    [STATE_ENUMS.loading]: <InitialLoadingScreen />,
    [STATE_ENUMS.unauthenticated]: <NewUser />,
    [STATE_ENUMS.authenticated]: children
  }
  return (
    <UserContext.Provider value={{ userNickName, setUserNickNameWithLocalStorage }}>
      {renderOptions[isAuthenticated]}
    </UserContext.Provider>
  )
}
