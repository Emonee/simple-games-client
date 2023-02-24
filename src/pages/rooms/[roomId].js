import getUrl from '@/helpers/getUrl'
import useRoomSocket from '@/hooks/useRoomSocket'
import { Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useRef } from 'react'

export default function ({ serverUrl }) {
  const { query: { roomId }, isReady } = useRouter()
  const url = serverUrl + '/rooms/' + roomId
  const { socket, room } = useRoomSocket(url, isReady)
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

export const getServerSideProps = getUrl
