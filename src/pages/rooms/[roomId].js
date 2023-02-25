import { useRouter } from 'next/router'
import RoomChatDrawer from '@/components/RoomChatDrawer'
import getUrl from '@/helpers/getUrl'
import RoomProvider from '@/providers/RoomProvider'
import RoomHeader from '@/components/RoomHeader'

export default function ({ serverUrl }) {
  const { query: { roomId }, isReady } = useRouter()
  const url = serverUrl + '/rooms/' + roomId

  if (!isReady) return null
  return (
    <RoomProvider url={url}>
      <RoomHeader />
      <RoomChatDrawer />
    </RoomProvider>
  )
}

export const getServerSideProps = getUrl
