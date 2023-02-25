import InitialLoadingScreen from '@/components/InitialLoadingScreen'
import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { UserContext } from './UserProvider'

export const RoomContext = createContext()

export default function ({ children, url }) {
  const { userNickName } = useContext(UserContext)
  const [generalRoomData, setGeneralRoomData] = useState(null)
  const [game, setGame] = useState(true)
  const [participants, setParticipants] = useState(null)
  const [chat, setChat] = useState(null)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socket = io(url)
    setSocket(socket)

    socket.on('getGeneralRoomData', setGeneralRoomData)
    socket.on('getGame', setGame)
    socket.on('getParticipants', setParticipants)
    socket.on('getChat', setChat)

    socket.once('connect', () => socket.emit('joinGameRoom', userNickName))
    socket.on('disconnect', () => console.log('disconected'))

    return () => socket.disconnect()
  }, [])

  const providerValues = {
    generalRoomData,
    game,
    participants,
    chat,
    socket
  }
  const providerIsReady = generalRoomData && game && participants && chat && socket
  return (
    <RoomContext.Provider value={providerValues}>
      {providerIsReady ? children : <InitialLoadingScreen />}
    </RoomContext.Provider>
  )
}
