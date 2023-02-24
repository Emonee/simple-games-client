import { shortFormatDate } from '@/helpers/formaters'
import { Box, Text } from '@chakra-ui/react'

export default function ({ message, createdAt, user: { nickName } }) {
  return (
    <Box w='full' bgColor='green.200' p='4' color='black' rounded='xl'>
      <Text>{message}</Text>
      <Text fontSize='sm' fontWeight='semibold'>{nickName}, {shortFormatDate(new Date(createdAt))}</Text>
    </Box>
  )
}
