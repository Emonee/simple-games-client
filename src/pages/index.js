import getUrl from '@/helpers/getUrl'
import { UserContext } from '@/providers/UserProvider'
import { Box, Button, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function ({ serverUrl }) {
  const { userNickName } = useContext(UserContext)
  const router = useRouter()

  const getNewRoom = async (e) => {
    e.preventDefault()
    const formData = new window.FormData(e.target)
    const roomName = formData.get('roomName')

    const url = serverUrl + '/rooms/new'
    const data = { roomName, userNickName }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    const res = await fetch(url, options)
    const text = await res.text()
    router.push(`/rooms/${text}`)
  }
  return (
    <Box as='form' onSubmit={getNewRoom}>
      <Input isRequired name='roomName' placeholder='Room name' />
      <Button type='submit'>Create room</Button>
    </Box>
  )
}

export const getStaticProps = getUrl
