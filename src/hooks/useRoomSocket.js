import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function (url, isReady) {
  const [socket, setSocket] = useState(null)
  const [room, setRoom] = useState(null)
  useEffect(() => {
    if (isReady) {
      const socket = io(url)
      setSocket(socket)
      socket.on('getRoom', setRoom)
    }
    return () => socket?.disconnect()
  }, [isReady])
  return { room, socket }
}
