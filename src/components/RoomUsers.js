import { CheckCircleIcon } from '@chakra-ui/icons'
import { List, ListIcon, ListItem } from '@chakra-ui/react'

export default function ({ users }) {
  return (
    <List display='flex' gap='9' maxW='full' overflowX='auto' pb='4'>
      {users.map(({ id, nickName }, index) =>
        <ListItem key={id || index} minW='fit-content'>
          <ListIcon as={CheckCircleIcon} color='green.500' />
          {nickName}
        </ListItem>
      )}
    </List>
  )
}
