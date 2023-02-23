import { UserContext } from '@/providers/UserProvider'
import { Box, Button, Input } from '@chakra-ui/react'
import { useContext } from 'react'

export default function () {
  const { setUserNickNameWithLocalStorage } = useContext(UserContext)

  const submitNickName = (e) => {
    e.preventDefault()
    const formData = new window.FormData(e.target)
    const userNickName = formData.get('userNickName')
    setUserNickNameWithLocalStorage(userNickName)
  }

  return (
    <Box as='form' onSubmit={submitNickName}>
      <Input name='userNickName' placeholder='Place your user nickname for other to identify you' />
      <Button type='submit'>Set my user nickname</Button>
    </Box>
  )
}
