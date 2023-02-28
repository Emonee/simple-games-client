import { Button, Center, Image, SimpleGrid, Text, Tooltip } from '@chakra-ui/react'

export default function ({ name, description, imgURL, openModalAndSelectGame }) {
  return (
    <SimpleGrid columns='2' p='4' rounded='xl' bgColor='green.300'>
      <Image src={imgURL} boxSize='100px' rounded='xl' alignSelf='center' />
      <Center flexDir='column' gap='3'>
        <Tooltip hasArrow label={description} rounded='lg' bgColor='black' color='white' p='3'>
          <Text fontSize='2xl' fontWeight='bold'>{name}</Text>
        </Tooltip>
        <Button onClick={() => openModalAndSelectGame(name)} colorScheme='purple'>Create room</Button>
      </Center>
    </SimpleGrid>
  )
}
