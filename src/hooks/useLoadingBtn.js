import { Button, useBoolean } from '@chakra-ui/react'

export default function (initialState = false) {
  const [isLoading, setIsLoading] = useBoolean(initialState)
  const LoadingBtn = ({ children, ...props }) => <Button isLoading={isLoading} {...props}>{children}</Button>
  return [LoadingBtn, setIsLoading]
}
