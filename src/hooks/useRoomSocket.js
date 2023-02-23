import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function (url, isReady) {
  const [socket, setSocket] = useState(null)
  const [room, setRoom] = useState(null)
  useEffect(() => {
    if (isReady && !socket) {
      const socket = io(url)
      setSocket(socket)
      socket.on('getRoom', setRoom)
    }
  }, [url])
  return { room, socket }
}
