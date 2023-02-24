import BasicModal from '@/components/modals/BasicModal'
import getUrl from '@/helpers/getUrl'
import useBasicToast from '@/hooks/useBasicToast'
import useLoadingBtn from '@/hooks/useLoadingBtn'
import { UserContext } from '@/providers/UserProvider'
import { Button, Center, Input, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function ({ serverUrl }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useBasicToast()
  const [LoadingBtn, setIsLoading] = useLoadingBtn()
  const { userNickName } = useContext(UserContext)
  const router = useRouter()

  const getNewRoom = async (e) => {
    e.preventDefault()
    setIsLoading.toggle()
    const formData = new window.FormData(e.target)
    const roomName = formData.get('roomName')

    const url = serverUrl + '/rooms/new'
    const data = { roomName, userNickName }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    try {
      const res = await fetch(url, options)
      const text = await res.text()
      router.push(`/rooms/${text}`)
    } catch (error) {
      console.error(error)
      setIsLoading.toggle()
      toast({
        title: 'Error trying to create a room 😖',
        status: 'error',
        containerStyle: { maxW: '92vw' }
      })
    }
  }
  return (
    <>
      <BasicModal
        isOpen={isOpen}
        onClose={onClose}
        modalHeaderChildren='To join a room, ask your friend for the url to join and just put it in your browser 🎮.'
        firstBtnChildren='Ok!'
      />
      <Center as='form' onSubmit={getNewRoom} flexDir='column' gap='3' p='7' minH='100vh' minW='100vw' bgColor='blue.800'>
        <Input isRequired name='roomName' placeholder='Room name' bgColor='white' maxLength='27' maxW='500px' />
        <LoadingBtn w='200px' type='submit' colorScheme='green'>Create room</LoadingBtn>
        <Button onClick={onOpen} w='200px' colorScheme='blue'>Join room</Button>
      </Center>
    </>
  )
}

export const getStaticProps = getUrl
