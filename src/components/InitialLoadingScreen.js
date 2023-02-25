import { Center, Spinner } from '@chakra-ui/react'

export default function () {
  return (
    <Center height='100vh' width='100vw' position='relative' bgColor='blue.800'>
      <Spinner color='blue.400' boxSize='50vw' thickness='7px' display='block' />
    </Center>
  )
}
