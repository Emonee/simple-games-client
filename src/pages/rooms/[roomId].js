import useRoomSocket from '@/hooks/useRoomSocket'
import { Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useRef } from 'react'

const url = process.env.SERVER_URL ? process.env.SERVER_URL + '/rooms/' : 'http://localhost:8080/rooms/'

export default function () {
  const { query: { roomId }, isReady } = useRouter()
  const { socket, room } = useRoomSocket(url + roomId, isReady)
  const inputRef = useRef()

  const changeRoomName = (e) => {
    e.preventDefault()
    const formData = new window.FormData(e.target)
    const newRoomName = formData.get('newRoomName')
    socket.emit('changeRoomName', newRoomName)
    inputRef.current.value = ''
  }
  return (
    <>
      <p>Room id: {room?.id}</p>
      <p>Room name: {room?.name}</p>
      <p>Room owner: {room?.ownerUser?.nickName}</p>
      <form onSubmit={changeRoomName}>
        <Input isRequired name='newRoomName' placeholder='Change room name' ref={inputRef} />
      </form>
    </>
  )
}
