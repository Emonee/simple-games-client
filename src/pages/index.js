import Head from 'next/head'
import { useRouter } from 'next/router'
import GameCard from '@/components/cards/GameCard'
import FormModal from '@/components/modals/FormModal'
import getUrl from '@/helpers/getUrl'
import { Center, Input, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import useBasicToast from '@/hooks/useBasicToast'

export default function ({ serverUrl, games }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useBasicToast()
  const [selectedGame, setSelectedGame] = useState(null)
  const router = useRouter()

  const openModalAndSelectGame = (gameName) => {
    setSelectedGame(gameName)
    onOpen()
  }
  const getNewRoom = async (e) => {
    e.preventDefault()
    const formData = new window.FormData(e.target)
    const roomName = formData.get('roomName')

    const url = serverUrl + '/rooms/new'
    const data = { roomName, roomsGame: selectedGame }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    try {
      const res = await fetch(url, options)
      if (!res.ok) throw new Error(res.statusText)
      const { newRoomId } = await res.json()
      onClose()
      router.push(`/rooms/${newRoomId}`)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error trying to create a room 😖',
        status: 'error',
        containerStyle: { maxW: '92vw' }
      })
    }
  }

  return (
    <>
      <Head>
        <title>Simple games 👾</title>
      </Head>
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={getNewRoom}
        modalHeaderChildren='Set a room name, then just share the given url to your friends!'
        firstBtnChildren='Cancel'
        secondBtnChildren='Submit'
      >
        <Input isRequired name='roomName' placeholder='Room name' />
      </FormModal>
      <Center flexDir='column' gap='3' p='7' minH='100vh' minW='100vw' bgColor='blue.800'>
        {
          games.map((game) => <GameCard key={game.name} openModalAndSelectGame={openModalAndSelectGame} {...game} />)
        }
      </Center>
    </>
  )
}

export async function getStaticProps () {
  const serverUrl = await getUrl()
  const res = await fetch(serverUrl + '/games')
  const { games } = await res.json()
  return {
    props: {
      serverUrl,
      games
    }
  }
}
