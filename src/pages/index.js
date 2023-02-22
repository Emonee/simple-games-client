import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Button } from '@chakra-ui/react'

const WS_URL = 'ws://localhost:8080'

export default function () {
  const [ws, setWs] = useState(null)
  useEffect(() => {
    const socket = io(WS_URL)
    setWs(socket)
    socket.on('connect', () => console.log('connected'))
    socket.on('bye', console.log)
    return () => socket.close()
  }, [])

  const emitHello = () => ws?.emit('hello', 'canaria')

  return <Button onClick={emitHello}>Emit hello</Button>
}
