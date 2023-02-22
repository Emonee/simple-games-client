import { ChakraProvider } from '@chakra-ui/react'

export default function ({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
