import { useContext } from 'react'
import { RoomContext } from '@/providers/RoomProvider'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function () {
  const { asPath } = useRouter()
  const { generalRoomData: { name, ownerUser }, userData } = useContext(RoomContext)

  const copyRoomUrl = () => {
    const fullUrl = `${window.location.origin}${asPath}`
    navigator.clipboard.writeText(fullUrl)
  }

  const userIsOwner = ownerUser.id === userData.id

  return (
    <>
      <Flex wrap='wrap' justifyContent='center' columnGap='7' color='white' py='5'>
        <Text fontSize={['lg', 'xl', '2xl']}><b>Room name:</b> {name}</Text>
        <Text fontSize={['lg', 'xl', '2xl']}><b>Room owner:</b> {ownerUser.nickName}</Text>
      </Flex>
      {userIsOwner && <Button onClick={copyRoomUrl} variant='outline' colorScheme='yellow' display='block' mx='auto'>Copy room URL</Button>}
    </>
  )
}
