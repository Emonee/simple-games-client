import { useRouter } from 'next/router'
import RoomChatDrawer from '@/components/RoomChatDrawer'
import getUrl from '@/helpers/getUrl'
import RoomProvider from '@/providers/RoomProvider'
import RoomHeader from '@/components/RoomHeader'
import Game from '@/components/Game'
import { Box } from '@chakra-ui/react'

export default function ({ serverUrl }) {
  const { query: { roomId }, isReady } = useRouter()
  const url = serverUrl + '/rooms/' + roomId

  if (!isReady) return null
  return (
    <RoomProvider url={url}>
      <Box minHeight='100vh' bgColor='blue.800' pb={{ base: '95px', md: '135px', lg: '180px' }}>
        <RoomHeader />
        <Game />
        <RoomChatDrawer />
      </Box>
    </RoomProvider>
  )
}

export async function getServerSideProps () {
  const serverUrl = await getUrl()
  return {
    props: {
      serverUrl
    }
  }
}
