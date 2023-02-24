import { UserContext } from '@/providers/UserProvider'
import { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function (url, isReady) {
  const { userNickName } = useContext(UserContext)
  const [socket, setSocket] = useState(null)
  const [room, setRoom] = useState(null)
  useEffect(() => {
    if (isReady) {
      const socket = io(url)
      setSocket(socket)
      socket.on('getRoom', (room) => {
        setRoom(room)
        console.log(room)
      })

      socket.once('connect', () => socket.emit('joinGameRoom', userNickName))
      socket.on('disconnect', () => console.log('disconected'))
    }
    return () => socket?.disconnect()
  }, [isReady])
  return { room, socket }
}
