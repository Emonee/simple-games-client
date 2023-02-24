import { Flex } from '@chakra-ui/react'
import MessageBox from './MessageBox'

export default function ({ messages, ...props }) {
  return (
    <Flex {...props} overflowY='auto' flexDir='column' gap='3'>
      {messages?.map((message, index) =>
        <MessageBox key={message.id || index} {...message} />
      )}
    </Flex>
  )
}
