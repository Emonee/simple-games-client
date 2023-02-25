import { useContext } from 'react'
import { RoomContext } from '@/providers/RoomProvider'
import { Text } from '@chakra-ui/react'

export default function () {
  const { generalRoomData: { name, ownerUser } } = useContext(RoomContext)
  return (
    <>
      <Text>Room name: {name}</Text>
      <Text>Room owner: {ownerUser.nickName}</Text>
    </>
  )
}
