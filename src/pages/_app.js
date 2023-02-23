import UserProvider from '@/providers/UserProvider'
import { ChakraProvider } from '@chakra-ui/react'

export default function ({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  )
}
