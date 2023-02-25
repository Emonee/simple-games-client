import { RoomContext } from '@/providers/RoomProvider'
import { ChatIcon } from '@chakra-ui/icons'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  IconButton
} from '@chakra-ui/react'
import { useContext, useRef } from 'react'
import ChatMessagesBox from './ChatMessagesBox'
import RoomUsers from './RoomUsers'

export default function () {
  const { chat, socket, participants } = useContext(RoomContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef = useRef()

  const sendMessage = (e) => {
    e.preventDefault()
    const formData = new window.FormData(e.target)
    const newMessage = formData.get('newMessage')
    socket.emit('sendMessage', newMessage)
    inputRef.current.value = ''
  }

  return (
    <>
      <IconButton
        onClick={onOpen}
        colorScheme='green'
        icon={<ChatIcon color='white' boxSize='full' />}
        p='5'
        rounded='xl'
        position='fixed'
        right='10px'
        bottom='10px'
        boxSize={{ base: '85px', md: '120px', lg: '160px' }}
      />
      <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
        initialFocusRef={inputRef}
      >
        <DrawerOverlay />
        <DrawerContent height='min(75vh, var(--chakra-sizes-xl))' bgColor='green.900' color='white'>
          <DrawerCloseButton />
          <DrawerHeader>Chat room</DrawerHeader>

          <DrawerBody display='flex' flexDir='column' gap='4'>
            <RoomUsers users={participants} />
            <ChatMessagesBox messages={chat} flex='1' />
          </DrawerBody>
          <DrawerFooter as='form' onSubmit={sendMessage}>
            <Input ref={inputRef} name='newMessage' placeholder='Type here...' bgColor='white' color='black' />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
