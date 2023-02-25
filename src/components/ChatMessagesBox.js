import { Flex } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import MessageBox from './MessageBox'

export default function ({ messages, ...props }) {
  const containerRef = useRef()
  useEffect(() => {
    containerRef.current.scrollTo({
      top: Number.MAX_SAFE_INTEGER,
      behavior: 'smooth'
    })
  }, [messages])

  return (
    <Flex ref={containerRef} overflowY='auto' flexDir='column' gap='3' {...props}>
      {messages?.map((message, index) =>
        <MessageBox key={message.id || index} {...message} />
      )}
    </Flex>
  )
}
