import { useToast } from '@chakra-ui/react'

export default function (props) {
  const toast = useToast({
    duration: 3500,
    isClosable: true,
    position: 'bottom'
  })
  return toast
}
