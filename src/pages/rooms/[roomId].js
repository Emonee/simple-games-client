import RoomChatDrawer from '@/components/RoomChatDrawer'
import getUrl from '@/helpers/getUrl'
import useRoomSocket from '@/hooks/useRoomSocket'
import { Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function ({ serverUrl }) {
  const { query: { roomId }, isReady } = useRouter()
  const url = serverUrl + '/rooms/' + roomId
  const { room, socket } = useRoomSocket(url, isReady)

  return (
    <>
      <Text textAlign='center' fontSize='xl' m='2'><b>Room name:</b> {room?.name}</Text>
      <Text textAlign='center' fontSize='lg' m='2'><b>Room owner:</b> {room?.ownerUser?.nickName}</Text>
      <RoomChatDrawer socket={socket} room={room} />
    </>
  )
}

export const getServerSideProps = getUrl
